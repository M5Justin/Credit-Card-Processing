const sequelize = require('../config/connection');
const seedUser = require('./userData');

const init = async () => {
  await sequelize.sync({ force: true });
  process.exit(0);
};

init();
