const express = require('express');
const agendaController = require('./controller/agendaController');
const userController = require('./controller/userController');
const router = express.Router();


router.get('/login', userController.login);
router.post('/cadastro', userController.cadastroUsuario)
router.get('/agendamentos', agendaController.getAll);
router.post('/agendamentos', agendaController.adicionarData);

module.exports = router;
