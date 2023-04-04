const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Pets extends Model {}


Pets.init(
  {
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      petType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      allergies: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vaccinated: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      isNeuteredOrSpayed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      sex: {
        type: DataTypes.ENUM(['male', 'female']),
        allowNull: false
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'pets',
  }
);

module.exports = Pets;