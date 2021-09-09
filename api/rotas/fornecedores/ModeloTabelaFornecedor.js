const {Sequelize, DataTypes} = require('sequelize')
const conexao = require('../../banco-de-dados')

const Fornecedor = conexao.define('Fornecedor', {
    empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('racao', 'brinquedos'),
        allowNull: false
    }
}, {
    tableName: 'fornecedores',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
})

module.exports = Fornecedor