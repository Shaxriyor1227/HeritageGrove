module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Model associations
  Customer.associate = (models) => {
    Customer.hasMany(models.User, {
      foreignKey: "customer_id",
      as: "user_customers",
    });

    Customer.hasMany(models.Customer_card, {
      foreignKey: "customer_id",
      as: "customer_cards",
    });
  };

  return Customer;
};
