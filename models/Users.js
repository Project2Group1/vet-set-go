const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');
class Users extends Model {}

Users.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'users',
  }
);

module.exports = Users;