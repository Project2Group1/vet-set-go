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

Users.hasMany(Topics);
Topics.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(Users);

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
