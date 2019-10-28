const Sequelize = require("sequelize");
const connection = require("../database/conexao");

const Contato = connection.define('mensagens', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ultimoNome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false

    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: false

    }
});

Contato.sync({force: false}).then(()=>{})

module.exports = Contato;