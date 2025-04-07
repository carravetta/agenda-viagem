const NeDB= require('nedb');
const User = require('./User');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const { log } = require('console');


    const db = new NeDB({
        filename: 'userLogin.db',
        autoload: true
    });

const getAll = async ()=>{
      return new Promise ((resolve, reject)=>{
        db.find({}).exec((err, agendamentos)=>{
          if(err){
            console.log(`ERRO DE BANCO DE DADOS ${err}`);
            reject(err);
          }else{
            resolve(agendamentos)
          }
      });
    });
  }


const findUser = async (email)=>{
    const emailFormat = email.trim().toLowerCase();
    
    return new Promise((resolve, reject)=>{ 
        db.findOne({_email : emailFormat}, (err, user)=>{
                    
        if(err)
            reject(err) ;
        else if(user === null){
            resolve (false);
        }
        else
            resolve(true);           
        });   
    });
}

const cadastroUsuario = async (novoUsuario)=>{

    const isNewUser = await findUser(novoUsuario.email);
    
    if(isNewUser){
        return {message : "Usuario já cadasatrado"};
    }

    const hashedSenha = await bcrypt.hash(novoUsuario.senha, 10);
    const user = new User (novoUsuario.nome, hashedSenha, novoUsuario.email);
    
    return new Promise ((resolve, reject)=>{
       db.insert(user, (err)=>{
        if(err){
            console.log(`ERRO DE BANCO DE DADOS: ${err}`);
            reject(err);
        }else{
            resolve(user);
        }
       }); 
    });
}

const searchByEmail = async (email)=>{
    console.log("SEARHING...");
    
    return new Promise((resolve, reject)=>{
        db.findOne({_email : email}, (err, user)=>{
            if(err){
                reject(err)
            }else{
            
                if(!user)
                    resolve(null)
                    
                resolve(user);
            }
        });
    });
}

const login = async (user)=>{
    console.log(typeof user.email);
    
    console.log(`tentativa de login de ${user.email}`);
         
    const userPassword = await searchByEmail(user.email);
     console.log(`userPassword ${userPassword}`);
     
    if(userPassword == null || "" || undefined){
        return {
            message: "Usuário não encontrado!", 
        };
    }

    const validatePassword = await bcrypt.compare(user.senha, userPassword._senha.toString());
    
    if(!validatePassword){
        
        return { 
                message: "Senha inválida", 
                };
    }
    
    const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn : '1h'});
        return {message: 'Login bem sucedido!', token};
}

module.exports = {login, cadastroUsuario}