const express = require('express');
const router = express.Router();
const controllerBooking = require('../controller/booking')

router.get('/',controllerBooking.get);
router.post('/',controllerBooking.postBooking);

module.exports = router;