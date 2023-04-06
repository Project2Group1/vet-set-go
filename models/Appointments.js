const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Appointments extends Model {}

Appointments.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isNeuteredOrSpayed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM(["male", "female"]),
      allowNull: false,
    },
    concern: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "appointments",
  }
);

module.exports = Appointments;
