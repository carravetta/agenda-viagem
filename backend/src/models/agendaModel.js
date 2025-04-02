const { log } = require('console');
const Agendamento = require("./Agendamento");
const NeDB= require('nedb');

    const db = new NeDB({
        filename: 'agendamento.db',
        autoload: true
    });

    const getAll = async ()=>{
      return new Promise ((resolve, reject)=>{
        db.find({}).exec((err, agendamentos)=>{
          if(err){
            console.log(`ERRO DE BANCO DE DADOS ${err}`);
            reject(err);
          }else{
            console.log(`Agendamentos: ${JSON.stringify(agendamentos)}`);
            resolve(agendamentos)
          }
      });
    });
  }

  const adicionarData = async (novoAgendamento)=>{
    var agendamento = new Agendamento(novoAgendamento.nome, novoAgendamento.email, novoAgendamento.dataSaida, novoAgendamento.dataRetorno, novoAgendamento.hora);

    return new Promise ((resolve, reject)=>{
      db.insert(agendamento, (err, agendamento)=>{
        if(err){
          console.log(err);
          reject(err)          
        }
        else{
          console.log(`Agendamento criado com sucesso`, agendamento);
          resolve(agendamento);  
        }
      });
    });
  }

  const removeData = async (agendamento)=>{

  }
  
module.exports = {
  getAll, adicionarData
}