const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteadorFornecedores = require('./rotas/fornecedores')
const NaoEncontrado = require('../erros/NaoEncontrado')
const CampoInvalido = require('../erros/CampoInvalido')

app.use(bodyParser.json())

app.use('/api/fornecedores', roteadorFornecedores)

app.use((error, req, res, proximo) => {
    let status = 500
    if (error instanceof NaoEncontrado) {
        status = 404
    } else if (error instanceof CampoInvalido){
        status = 400
    }
    res.status(status)
    res.json({...error, 'mensagem': error.message})
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))