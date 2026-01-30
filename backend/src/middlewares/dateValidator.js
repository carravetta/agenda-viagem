const Ajv  = require('ajv');
const addFormats = require("ajv-formats");

const validateNewDate = (req, res, next)=>{

    const {body} = req;
    
    const schema = {
        "type" : "object",
        "properties" : {
                "dataSaida": { "type": "string", "format": "date" },
                "dataRetorno": { "type": "string", "format": "date" },
                "hora": { "type": "string", "pattern": "^([01]\\d|2[0-3]):[0-5]\\d$" },
                "horaRetorno": {"type" : "string", "pattern": "^([01]\\d|2[0-3]):[0-5]\\d$" }
            },
            "required": ["dataSaida", "dataRetorno", "hora", "horaRetorno"]
        };
    const data1 = new Date (body.dataSaida);
    const data2 = new Date (body.dataRetorno);
    const dataValida = isValidDate(data1, data2);

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const isValid = validate(body);

    if(!isValid){
        
        return res.status(400).json({message : "Campos inválidos, verifique"});
    }

    if(!dataValida){
        return res.status(400).json({message : "Data de saida não pode ser maior que a data de retorno!"});
    } 
    
    next();
}

const isValidDate = (data1, data2)=>{
    if(data1>data2)
        return false;

    return true;
}

module.exports = {validateNewDate}
