class User{

    constructor (nome, senha, email){
        this._nome = nome;
        this._senha = senha;
        this._email = email;

    }

 
    get senha(){
        return this._senha;
    }

    get nome(){
        return this._nome;
    }

    get email(){
        return this._email;
    }

}

module.exports = User;
