const sequelize = require('../config/connection.js');
const { Comments, Pets, Records, Topics, Users } = require('../models');

const topicsData = require('./topics-seeds.json');
const commentsData = require('./comments-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await Topics.bulkCreate(topicsData, {
      returning: true,
    });

    await Comments.bulkCreate(commentsData, {
      return: true,
    })
  
    process.exit(0);
  };
  
  seedDatabase();