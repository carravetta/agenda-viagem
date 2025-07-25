const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4000', //alterar para o IP do servidor
    credentials: true
}));
app.use(router);



module.exports = app