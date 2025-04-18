const express = require("express");
const path = require('path');


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/view', 'login.html'));
  });

module.exports = app