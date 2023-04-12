const Users = require("./Users");
const Records = require("./Records");
const Topics = require("./Topics");
const Comments = require("./Comments");
const Pets = require("./Pets");
const Appointments = require("./Appointments");

Users.hasMany(Pets, {
  foreignKey: "owner_id",
  onDelete: "CASCADE",
});
Pets.belongsTo(Users);

Pets.hasMany(Records, {
  foreignKey: "pet_id",
  onDelete: "CASCADE",
});
Records.belongsTo(Pets);

Users.hasMany(Topics, {
  foreignKey: "user_id",
});

Topics.belongsTo(Users, {
  foreignKey: "user_id",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
});
Comments.belongsTo(Users, {
  foreignKey: "user_id",
});

Topics.hasMany(Comments, {
  foreignKey: "topics_id",
});

Comments.belongsTo(Topics, {
  foreignKey: "topics_id",
});

module.exports = {
  Users,
  Pets,
  Records,
  Comments,
  Topics,
  Appointments,
};
