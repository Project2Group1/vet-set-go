const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connections');

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
        type: Datatypes.INTEGER,
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