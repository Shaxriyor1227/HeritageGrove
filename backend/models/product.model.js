module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Vases",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      defaultValue: "Handmade",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stockCount: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  }, {
    tableName: "products",
    timestamps: true,
    indexes: [
      { fields: ["category"] },
      { fields: ["price"] },
    ],
  });

  return Product;
};
