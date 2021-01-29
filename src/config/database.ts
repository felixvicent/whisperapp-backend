require('../bootstrap');

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  storage: './src/__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
