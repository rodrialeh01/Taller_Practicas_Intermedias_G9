const express = require('express');
const router = express.Router();

const brokerController = require('../controllers/broker_controller');

router.get('/estado', brokerController.estado);
router.put('/actualizarEstado', brokerController.actualizarEstado);

module.exports = router;