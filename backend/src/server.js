require('dotenv').config();
const app = require("./app");

app.listen(3000, ()=>{console.log('Server rodando na porta 3000')});

module.exports = app