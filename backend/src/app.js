const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router");

const app = express();
console.log("SERVIDOR_IP:", process.env.SERVIDOR_IP);
console.log("PORT_FRONTEND:", process.env.PORT_FRONTEND);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    //origin: ['http://localhost:4000', `http://${process.env.SERVIDOR_IP}:${process.env.PORT_FRONTEND}`],
    origin: "http://localhost:4000",
    credentials: true
}));
app.use(router);



module.exports = app