const router = require('express').Router();
const controller = require('../controllers/donationController');
const { autenticar } = require('../middleware/auth');

router.post('/:campaignId', autenticar, controller.apoiar);

module.exports = router;
