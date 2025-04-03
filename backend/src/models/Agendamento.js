class Agendamento{
    constructor( nome, email, dataSaida, dataRetorno, hora){
    
        this._nome = nome;  
        this._email = email;
        this._dataSaida = dataSaida;
        this._dataRetorno = dataRetorno;
        this._hora = hora
    }    


    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get dataSaida() {
        return this._dataSaida;
    }

    get dataRetorno() {
        return this._dataRetorno;
    }

    get hora() {
        return this._hora;
    }

}



module.exports = Agendamento;