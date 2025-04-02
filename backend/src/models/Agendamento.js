class Agendamento{
    constructor(nome, email, dataSaida, dataRetorno, hora){
        this._nome = nome;
        this._email = email;
        this._dataSaida = dataSaida;
        this._dataRetorno = dataRetorno;
        this._hora = hora
    }    
}



module.exports = Agendamento;