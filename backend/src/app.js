const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(router);



module.exports = app