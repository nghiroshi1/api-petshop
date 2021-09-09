const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.json(resultados)
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    .then(resultados => res.json(fornecedor))
    .catch(error => res.json(error))
})

roteador.get('/:id', async (req, res) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({id})
    fornecedor.carregar()
    .then(resultados => {
        res.json(fornecedor)
    })
    .catch(error => {
        res.json(error)
    })
})

roteador.put('/:id', async (req, res) => {
    const id = req.params.id
    const dadosRecebidos = req.body
    const dadosRecebidosComId = {...dadosRecebidos, id}

    const fornecedor = new Fornecedor(dadosRecebidosComId)
    await fornecedor.atualizar()
    .then(resultados => res.json(fornecedor))
    .catch(error => res.json(error))

    res.end()
})

module.exports = roteador