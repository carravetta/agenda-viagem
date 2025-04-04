const express = require('express');
const agendaController = require('./controller/agendaController');
const userController = require('./controller/userController');
const dateValidator = require('./middlewares/dateValidator')
const router = express.Router();


router.get('/login', userController.login);
router.post('/cadastro', userController.cadastroUsuario)
router.get('/agendamentos', agendaController.getAll);
router.post('/agendamentos', dateValidator.validateNewDate, agendaController.addDate);
router.delete('/agendamentos/:id', agendaController.removeAgendamento);
router.delete('/agendamentos', agendaController.removeAll);
router.put('/agendamentos/:id', agendaController.update);

module.exports = router;
