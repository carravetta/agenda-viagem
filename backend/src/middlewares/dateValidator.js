const Ajv  = require('ajv');
const addFormats = require("ajv-formats");

const validateNewDate = (req, res, next)=>{

    const {body} = req;
    console.log(body);
    
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
    
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const isValid = validate(body);

    if(!isValid)
        return res.status(400).json({message : "Campos inválidos, verifique"});

    next();
}

module.exports = {validateNewDate}
