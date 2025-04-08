

class Agendamento{
    constructor( nome, email, dataSaida, dataRetorno, hora, horaRetorno){
    
        this._user = new User(nome, '', email);
        this._dataSaida = dataSaida;
        this._dataRetorno = dataRetorno;
        this._hora = hora;
        this._horaRetorno = horaRetorno;
    }    

    get user(){
        return this._user;
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

    get horaRetorno() {
        return this._horaRetorno;
    }

    get user (){
        return this._user;
    }

}



module.exports = Agendamento;