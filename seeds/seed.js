const sequelize = require('../config/connection.js');
const { Comments, Pets, Records, Topics, Users } = require('../models');

const usersData = require('./users-seeds.json');
const petsData = require('./pets-seeds.json');
const recordsData = require('./records-seeds.json');
const topicsData = require('./topics-seeds.json');
const commentsData = require('./comments-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await Users.bulkCreate(usersData, {
      individualHooks: true,
      returning: true,
    });

    await Pets.bulkCreate(petsData, {
      returning: true,
    });

    await Records.bulkCreate(recordsData, {
      returning: true,
    });

    await Topics.bulkCreate(topicsData, {
      returning: true,
    });

    await Comments.bulkCreate(commentsData, {
      return: true,
    })
  
    process.exit(0);
  };
  
  seedDatabase();