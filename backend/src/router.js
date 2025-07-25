const express = require('express');
const agendaController = require('./controller/agendaController');
const userController = require('./controller/userController');
const dateValidatorMiddleware = require('./middlewares/dateValidator')
const authMiddleware = require('./middlewares/auth');
const deleteOldDateMiddleware = require('./middlewares/deleteOldDate');
const router = express.Router();


router.post('/login', userController.login);
router.post('/cadastro', userController.cadastroUsuario);
router.get('/login', authMiddleware.auth, userController.getUser);
router.get('/agendamentos', authMiddleware.auth, agendaController.getAll);
router.post('/agendamentos', authMiddleware.auth, dateValidatorMiddleware.validateNewDate, agendaController.addDate);
router.delete('/agendamentos/:id',authMiddleware.auth, agendaController.removeAgendamento);
router.delete('/agendamentos', authMiddleware.auth, agendaController.removeAll);
router.put('/agendamentos/:id',authMiddleware.auth, agendaController.update);

module.exports = router;
