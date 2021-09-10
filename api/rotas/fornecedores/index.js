const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200).json(resultados)
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
            .then(resultados => res.status(201).json(fornecedor))
            .catch(error => res.status(400).json(error.message))
    
})

roteador.get('/:id', async (req, res) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({id})
    fornecedor.carregar()
    .then(resultados => {
        res.status(200).json(fornecedor)
    })
    .catch(error => {
        res.status(404).json(error)
    })
})

roteador.put('/:id', async (req, res) => {
    const id = req.params.id
    const dadosRecebidos = req.body
    const dadosRecebidosComId = {...dadosRecebidos, id}

    const fornecedor = new Fornecedor(dadosRecebidosComId)
    await fornecedor.atualizar()
    .then(resultados => res.status(200).json(fornecedor))
    .catch(error => res.status(400).json(error))
    res.end()
})

roteador.delete('/:id', async (req, res) => {
    const id = req.params.id
    const fornecedor = new Fornecedor({id:id})
    await fornecedor.carregar()
        .catch(error => res.status(404).json(error))
    await fornecedor.remover()
    res.status(204).end()
})

module.exports = roteador