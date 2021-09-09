const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

ModeloTabela.sync()
    .then((resultados) => console.log('Tabela criada com sucesso! ' + resultados))
    .catch(console.log)
