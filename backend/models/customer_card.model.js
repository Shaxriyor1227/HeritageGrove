module.exports = (sequelize, DataTypes) => {
  const Customer_card = sequelize.define("Customer_card", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Customer_card.associate = (models) => {
    Customer_card.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
  };

  return Customer_card;
};
