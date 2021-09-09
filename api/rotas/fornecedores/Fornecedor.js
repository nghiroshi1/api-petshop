const TabelaFornecedor = require('./TabelaFornecedor')

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
                return new Promise((resolve, reject) => reject({"mensagem": "Fornecedor não encotrado."}))
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
        await TabelaFornecedor.pesquisarPorId(this.id)

        await TabelaFornecedor.atualizar(this)
        
    }
}

module.exports = Fornecedor