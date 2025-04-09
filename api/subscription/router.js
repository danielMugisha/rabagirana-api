const Subscription = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/subscribe', Subscription.create);

module.exports = router;