const Ajv  = require('ajv');

const validateNewDate = (req, res, next)=>{

    const {body} = req;

    const schema = {
        "type" : "object",
        "properties" : {
            "_dataSaida": { "type": "string", "format": "date-time" },
            "_dataRetorno": { "type": "string", "format": "date-time" },
            "_hora": { "type": "string", "pattern": "^([01]\\d|2[0-3]):[0-5]\\d$" }
        },
        'required' : ['_dataSaida', '_dataRetorno', '_hora']
    }

    const ajv = new Ajv();
    const validate = ajv.copile(schema);
    const isValid = validate(body);

    if(!isValid)
        return res.status(400).json({message : "Campos inválidos, verifique"});

    next();
}

module.exports = {validateNewDate}
