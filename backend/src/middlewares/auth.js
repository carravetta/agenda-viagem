const jwt = require('jsonwebtoken');

const auth = (req, res)=>{

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message : "Acesso negado!"});
    }

    try{
        const decoded = jwt.verify(token.replace("Bearer", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(403).json({message : "Token invalido"});
    }

}

module.exports={
    auth
}