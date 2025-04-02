const NeDB= require('nedb');
const User = require('./User');

    const db = new NeDB({
        filename: 'userLogin.db',
        autoload: true
    });

const cadastroUsuario = async (novoUsuario)=>{
    return new Promise ((resolve, reject)=>{
       db.insert(novoUsuario, (err)=>{
        if(err){
            console.log(`ERRO DE BANCO DE DADOS: ${err}`);
            reject(err);
        }else{
            console.log(`Usuario adicionado ${JSON.stringify(novoUsuario)}`);
            resolve(novoUsuario)
        }
       }); 
    });
}


const login = async (user)=>{
    var newUser = new User (null, user.senha, user.email);
    return new Promise((resolve, reject)=>{
        db.findOne({email : newUser.email, senha: newUser.senha}, (err, user)=>{
           console.log(`FINDONE: ${newUser.email}`);
            if(err){
                console.log(`ERRO DE BANCO DE DADOS: ${err}`);
                reject(err);
            }else{
                if(user){
                   
                    console.log(`Usuario encontrado ${JSON.stringify(newUser)}`);
                    resolve(user);   
                }else{
                    resolve('Usuario invalido');
                }     
            }
        });
    });
}

module.exports = {login, cadastroUsuario}