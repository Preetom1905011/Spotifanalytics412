// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('spotifanalyticsDB', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,  // PostgreSQL default port
    dialect: 'postgres',
    logging: false,  // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
