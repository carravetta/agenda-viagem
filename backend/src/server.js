require('dotenv').config();
const app = require("./app");

//app.listen(process.env.PORT_BACKEND, '0.0.0.0', ()=>{console.log(`Server rodando na porta ${process.env.PORT_BACKEND}`)});
app.listen('3000', ()=>{console.log(`Server rodando na porta ${process.env.PORT_BACKEND}`)});
module.exports = app