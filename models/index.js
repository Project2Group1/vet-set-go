const Users = require('./Users');
const Records = require('./Records');
const Topics = require('./Topics');
const Comments = require('./Comments');
const Pets = require('./Pets');

Users.hasMany(Pets);
Pets.belongsTo(Users);

Pets.hasMany(Records);
Records.belongsTo(Pets);

Users.hasMany(Topics);
Topics.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(User);

Topics.hasMany(Comment);
Comment.belongsTo(Topic);

module.exports = {
    Users,
    Pets,
    Records,
    Comments,
    Topics,
};