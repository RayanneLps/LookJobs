const Sequelize = require('sequelize');
const bd = require('../db/connection');

const Job = bd.define('job', {
    titulo:{
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    salario: {
        type: Sequelize.STRING
    },
    empresa: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    nova_vaga: {
        type: Sequelize.INTEGER
    }
});

module.exports = Job