const TabelaFornecedor = require('./TabelaFornecedor')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
const CampoInvalido = require('../../../erros/CampoInvalido')

class Fornecedor{
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar(){
        this.validarCamposObrigatorios()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        await TabelaFornecedor.pesquisarPorId(this.id)
        .then(encontrado => {
            if (!encontrado){
                throw new NaoEncontrado('Fornecedor')
            }

            this.id = encontrado.id
            this.empresa = encontrado.empresa
            this.email = encontrado.email
            this.dataCriacao = encontrado.dataCriacao
            this.dataAtualizacao = encontrado.dataAtualizacao
            this.versao = encontrado.versao
        })
    }

    async atualizar(){
        this.validarCamposObrigatorios()
        await TabelaFornecedor.pesquisarPorId(this.id)
        TabelaFornecedor.atualizar(this)
        
    }

    async remover(){
        TabelaFornecedor.remover(this.id)
    }

    validarCamposObrigatorios(){
        const campos = ['empresa', 'email', 'categoria']
        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Fornecedor