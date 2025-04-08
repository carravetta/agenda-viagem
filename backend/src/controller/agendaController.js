
const { log } = require('console');
const agendaModel = require('../models/agendaModel');

const getAll = async (req, res)=>{
    const agendamentos = await agendaModel.getAll();
    return res.status(200).json({agendamentos : agendamentos, user: req.user});
}

const addDate = async (req, res)=>{  
    const agendamento = await agendaModel.addDate(req.body);
    return res.status(201).json(agendamento);
}

const removeAgendamento = async (req, res)=>{
    var {id} = req.params;
    console.log(id);
    
    const removeData = await agendaModel.removeAgendamento(id);
    return res.status(200).json(removeData);
}

const update = async (req, res)=>{
    var {id} = req.params;
    const updateDate = await agendaModel.update(id, req.body);
    return res.status(201).json(updateDate);
}

const removeAll = async (_req, res)=>{
    const removeAll = await agendaModel.removeAll();
    return res.status(201).json(removeAll);
}
module.exports = {
    getAll, addDate, removeAgendamento, update, removeAll
}