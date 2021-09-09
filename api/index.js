const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteadorFornecedores = require('./rotas/fornecedores')

app.use(bodyParser.json())

app.use('/api/fornecedores', roteadorFornecedores)

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))