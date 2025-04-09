const userModel = require('../models/userModel');

const login = async (req, res,)=>{
    const token = await userModel.login(req.body);
    
    if(token){
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 360000
        });        
        return res.status(200).json(token);
    }else
    return res.status(400).json(token);
}

const cadastroUsuario = async (req, res,)=>{
    const newUser = await userModel.cadastroUsuario(req.body);
    return res.status(201).json(newUser);
}

const getUser = async (req, res)=>{
    const user = await userModel.getUser();
}

module.exports = {login, cadastroUsuario}