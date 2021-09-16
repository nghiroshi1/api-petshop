const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200).json(resultados)
})

roteador.post('/', async (req, res, proximo) => {
    const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
            .then(resultados => res.status(201).json(fornecedor))
            .catch(error => proximo(error))
    
})

roteador.get('/:id', async (req, res, proximo) => {
    try{
        const id = req.params.id
        const fornecedor = new Fornecedor({ id })
        await fornecedor.carregar()
        res.status(200).json(fornecedor)
    } catch(error){
        proximo(error)
    }
})

roteador.put('/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dadosRecebidosComId = { ...dadosRecebidos, id }

        const fornecedor = new Fornecedor(dadosRecebidosComId)
        await fornecedor.atualizar()
        res.status(204).json(fornecedor)
        res.end()
    } catch (error) {
       proximo(error)
    }
    
})

roteador.delete('/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()
    } catch (error) {
        proximo(error)
    }
})

module.exports = roteador