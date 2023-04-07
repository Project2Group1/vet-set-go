const Users = require("./Users");
const Records = require("./Records");
const Topics = require("./Topics");
const Comments = require("./Comments");
const Pets = require("./Pets");
const Appointments = require("./Appointments");

Users.hasMany(Pets);
Pets.belongsTo(Users);

Pets.hasMany(Records);
Records.belongsTo(Pets);

Users.hasMany(Topics, {
  foreignKey: 'user_id',
});

Topics.belongsTo(Users, {
  foreignKey: 'user_id',
});

Users.hasMany(Comments, {
  foreignKey: 'user_id',
});
Comments.belongsTo(Users, {
  foreignKey: 'user_id',
});

Topics.hasMany(Comments, {
    foreignKey: 'topics_id',
});

Comments.belongsTo(Topics, {
    foreignKey: 'topics_id',
});

Users.hasMany(Appointments);
Appointments.belongsTo(Users);

module.exports = {
  Users,
  Pets,
  Records,
  Comments,
  Topics,
  Appointments,
};
