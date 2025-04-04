const NeDB= require('nedb');
const User = require('./User');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

    const db = new NeDB({
        filename: 'userLogin.db',
        autoload: true
    });

const findUser = async (email)=>{
    db.find({_email : email}, (err, callback)=>{
        if(err)
            return err;
        else if(callback.length == 0)
            return true;
        else
            return false;
            
        });
    }

const cadastroUsuario = async (novoUsuario)=>{

    const isNewUser = findUser(novoUsuario.email);

    if(!isNewUser)
        return {message : "Usuario já cadasatrado"};

    const hashedSenha = await bcrypt.hash(novoUsuario.senha, 10);
    const user = new User (novoUsuario.nome, hashedSenha, novoUsuario.email);
    console.log(JSON.stringify(user));
    

    return new Promise ((resolve, reject)=>{
       db.insert(JSON.stringify(user), (err)=>{
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