const router = require('express').Router();
const authController = require('../controllers/authController');
const { autenticar } = require('../middleware/auth');

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.get('/perfil', autenticar, authController.perfil);

module.exports = router;
