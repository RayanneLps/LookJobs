const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite', //o banco
    storage: './db/app.db'  //onde ta o banco
});

module.exports = sequelize;