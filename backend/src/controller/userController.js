const userModel = require('../models/userModel');

const login = async (req, res,)=>{
    const user = await userModel.login(req.body);
    return res.status(200).json(user);
}

const cadastroUsuario = async (req, res,)=>{
    const newUser = await userModel.cadastroUsuario(req.body);
    return res.status(201).json(newUser);
}

module.exports = {login, cadastroUsuario}