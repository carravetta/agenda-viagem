//Deleta agendamentos ultrapassados

const { log } = require('console');

const deleteOldDate = (req, res, next) =>{
    console.log("middleware");
    
    console.log(JSON.stringify(req.agendamentos));
    //const today = agendaModel.dateFormat(new Date());

        //console.log(JSON.parse(agenda));   
    return
}

module.exports ={
    deleteOldDate
}