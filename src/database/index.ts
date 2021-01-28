import Sequelize from 'sequelize';

const databaseConfig = require('../config/database');

class Database {
  public connection: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize.Sequelize(databaseConfig);
  }
}

export default new Database();
