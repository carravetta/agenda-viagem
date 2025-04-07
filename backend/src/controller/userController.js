const userModel = require('../models/userModel');

const login = async (req, res,)=>{
    const user = await userModel.login(req.body);
    
    if(user.token){
        res.cookie('token', user.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 360000
        });
        console.log("USER CONTROLLER", user);
        
        return res.status(200).json(user);
    }else
    return res.status(400).json(user);
}

const cadastroUsuario = async (req, res,)=>{
    const newUser = await userModel.cadastroUsuario(req.body);
    return res.status(201).json(newUser);
}

module.exports = {login, cadastroUsuario}