const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize.DataTypes);
const Customer = require("./customer.model")(sequelize, Sequelize.DataTypes);
const Customer_card = require("./customer_card.model")(sequelize, Sequelize.DataTypes);
const Subscriber = require("./subscriber.model")(sequelize, Sequelize.DataTypes);
const Product = require("./product.model")(sequelize, Sequelize.DataTypes);
const Order = require("./order.model")(sequelize, Sequelize.DataTypes);
const OrderItem = require("./orderItem.model")(sequelize, Sequelize.DataTypes);

// Model connections / associations
if (User.associate) User.associate(sequelize.models);
if (Customer.associate) Customer.associate(sequelize.models);
if (Customer_card.associate) Customer_card.associate(sequelize.models);
if (Order.associate) Order.associate(sequelize.models);
if (OrderItem.associate) OrderItem.associate(sequelize.models);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Customer,
  Customer_card,
  Subscriber,
  Product,
  Order,
  OrderItem,
};

