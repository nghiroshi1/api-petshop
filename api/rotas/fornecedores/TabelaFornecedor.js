const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar(){
        return Modelo.findAll()
    },
    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },
    pesquisarPorId(id){
        return Modelo.findByPk(id)
    },
    atualizar(fornecedor){
        console.log("LOGX: "+fornecedor.id)
        Modelo.update(fornecedor, {where: {id:fornecedor.id}})
        .then(result=> console.log(result))
        .catch(erro => console.log(erro))
    }
}