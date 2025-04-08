const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{

    const token = req.cookies.token;
    
    if(!token){ 
        console.log(`if(!token)`);
               
        return res.status(401).json({message : "Acesso negado!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded);
        
        req.user = decoded;
        next();
    }catch(error){
        res.status(403).json({message : "Token invalido"});
    }
}

module.exports={
    auth
}