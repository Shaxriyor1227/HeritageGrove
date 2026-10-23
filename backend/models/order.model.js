module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    customer_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: "cash_on_delivery",
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: "order_id",
      as: "items",
      onDelete: "CASCADE",
    });
  };

  return Order;
};
