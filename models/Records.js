const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Records extends Model {}

Records.init(
  {
    weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      lastAppointment: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      vetNotes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pet_id: {
        type: DataTypes.INTEGER,
        referenes: {
            model: 'pets',
            key: 'id',
        }
      },
  },
  {
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'records',
  }
);

module.exports = Records;