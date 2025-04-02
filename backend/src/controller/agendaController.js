
const agendaModel = require('../models/agendaModel');

const getAll = async (_req, res)=>{
    const agendamentos = await agendaModel.getAll();
    return res.status(200).json(JSON.stringify(agendamentos));
}

const adicionarData = async (req, res)=>{
    console.log(`REQ.BODY: ${req.body}`);
    
    const agendamento = await agendaModel.adicionarData(req.body);
    res.status(200).json(agendamento);
}

module.exports = {
    getAll, adicionarData
}