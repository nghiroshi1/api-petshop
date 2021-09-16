class NaoEncontrado extends Error{
    constructor(nomeObjeto){
        super(`${nomeObjeto} não encontrado.`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado