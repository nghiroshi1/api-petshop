const {Sequelize} = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get('mariadb.banco-de-dados'),
    config.get('mariadb.usuario'),
    config.get('mariadb.senha'),
    {
        host: config.get('mariadb.host'),
        dialect: 'mariadb'
    })



module.exports = instancia

