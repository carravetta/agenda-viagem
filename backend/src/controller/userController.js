const userModel = require('../models/userModel');

const login = async (req, res,)=>{
    const token = await userModel.login(req.body);
    console.log("TOKEN DO USERCONTROLLER: " +token)
    if(token){
        console.log("ENTREI NO IF DO TOKEN");
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 3600000
        });       
    
        return res.status(200).json(token);
    }else{
        console.log("DEI ERRO NO TOKEN DO LOGIN");
        
        return res.status(401).json(token);
    }
}   

const cadastroUsuario = async (req, res,)=>{
    const newUser = await userModel.cadastroUsuario(req.body);
    return res.status(201).json(newUser);
}

const getUser = async (req, res)=>{
   
    return res.status(200).json(req.user);
}   

module.exports = {login, cadastroUsuario, getUser}