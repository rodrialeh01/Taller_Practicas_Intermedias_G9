const express = require('express');
const router = express.Router();

const brokerController = require('../controllers/broker_controller');

router.get('/estado', brokerController.estado);
router.put('/encender', brokerController.encender);
router.put('/apagar', brokerController.apagar);

module.exports = router;