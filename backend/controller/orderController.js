const { Order, OrderItem, Product, sequelize } = require("../models");
const { validateOrder } = require("../validations/orderValidation");

exports.createOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    payment_method,
    notes,
    items,
  } = req.body;

  // Calculate total amount
  const calculatedTotal = items.reduce(
    (sum, item) => sum + Number(item.price) * parseInt(item.quantity, 10),
    0
  );

  const t = await sequelize.transaction();

  try {
    const order = await Order.create(
      {
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        payment_method: payment_method || "cash_on_delivery",
        total_amount: calculatedTotal,
        status: "pending",
        notes,
      },
      { transaction: t }
    );

    const orderItemsData = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id || null,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || null,
    }));

    await OrderItem.bulkCreate(orderItemsData, { transaction: t });

    // Optional stock adjustment
    for (const item of items) {
      if (item.product_id) {
        const prod = await Product.findByPk(item.product_id, { transaction: t });
        if (prod && prod.stockCount >= item.quantity) {
          await prod.update(
            { stockCount: prod.stockCount - item.quantity },
            { transaction: t }
          );
        }
      }
    }

    await t.commit();

    const createdOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: "items" }],
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: createdOrder,
    });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "items" }],
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Allowed: ${allowed.join(", ")}` });
  }

  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.update({ status });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
