const { log } = require('console');
const User = require('./User');
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
            
            deleteOldDates(agendamentos)     
            resolve(agendamentos);
          }
      });
    });
  }

  const deleteOldDates = (agenda)=>{

    var removed = 0;
    var dataExclusao = new Date();    
    if(agenda){
      agenda.forEach((agendamento, index)=>{
        
        let dataRetorno = new Date(agendamento._dataRetorno);
        dataRetorno.setDate(dataRetorno.getDate()+10);

        if(dataRetorno < dataExclusao){
           
            removeAgendamento(agendamento._id);
            removed++;
        }       
      });
  }
    return removed;
  }

  const addDate = async (novoAgendamento, userLogin)=>{

    var agendamento = new Agendamento(userLogin.nome, userLogin.email, novoAgendamento.dataSaida, novoAgendamento.dataRetorno, novoAgendamento.hora, novoAgendamento.horaRetorno);    
    return new Promise ((resolve, reject)=>{
      db.insert(agendamento, (err, agendamento)=>{
        if(err){
          console.log(err);
          reject(err)          
        }
        else{
          resolve(agendamento);  
        }
      });
    });
  }

  const removeAgendamento = async (idDelete)=>{
    return new Promise ((resolve, reject)=>{
      db.remove({_id: idDelete}, {}, (err, numRemoved)=>{
        if(err){
          reject({'message': 'erro banco de dados'});
        }else{
          resolve(numRemoved);
        }
      });
    });
  }

  const removeAll = async ()=>{
    return new Promise ((resolve, reject)=>{
      db.remove({}, {multi: true}, (err, removed)=>{
        if(err){
          reject(err);
        }else{
          resolve(removed);
        }
      });
    });
  }

  const update = async (idUpdate, newValues, user)=>{
    console.log("entrei no update AgendaController")
    var newDate = new Agendamento(user.name, newValues.email, newValues.dataSaida, newValues.dataRetorno, newValues.hora);    
     console.log(JSON.stringify(newDate)) 
     console.log(JSON.stringify(user)) 
     console.log(newValues);
     
    return new Promise ((resolve, reject)=>{
      db.update({_id : idUpdate}, {$set: {
        _dataSaida: newDate.dataSaida,
        _dataRetorno: newDate.dataRetorno,
        _hora: newDate.hora
      }}, (err, replaced)=>{
        if(err){
          reject(err);
        }else{        
          resolve(replaced);
        }
      });
    });
  }

  
module.exports = {
  getAll, addDate, removeAgendamento, update, removeAll
}