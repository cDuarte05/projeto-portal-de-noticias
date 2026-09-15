const router = require('express').Router();
const controller = require('../controllers/campaignController');
const { autenticar, permitir } = require('../middleware/auth');

router.get('/', controller.listar);
router.get('/minhas/campanhas', autenticar, controller.minhasCampanhas);
router.get('/:id', controller.obterPorId);
router.post('/', autenticar, controller.criar);
router.patch('/:id/moderar', autenticar, permitir('professor_moderador'), controller.moderar);

module.exports = router;
