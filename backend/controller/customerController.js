const { Customer, User, Customer_card } = require("../models");
const { validateCustomer } = require("../validations/customerValidation");
const { Op } = require("sequelize");

exports.createCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.create(req.body);
    res.status(201).send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        { model: User, as: "user_customers" },
        { model: Customer_card, as: "customer_cards" },
      ],
    });
    res.status(200).send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        { model: User, as: "user_customers" },
        { model: Customer_card, as: "customer_cards" },
      ],
    });

    if (!customer) return res.status(404).send("Customer not found");
    res.status(200).send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    await customer.update(req.body);
    res.status(200).send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    const customerData = customer.toJSON();
    await customer.destroy();
    res.status(200).send(customerData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchCustomer = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).send("Search query is required");

    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.status(200).send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
