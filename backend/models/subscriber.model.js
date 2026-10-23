module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define("Subscriber", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  }, {
    tableName: "subscribers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  });

  return Subscriber;
};
