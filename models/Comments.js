const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Comments extends Model {}

Comments.init(
  {
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    topics_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "topics",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "comments",
  }
);

module.exports = Comments;
