const router = require('express').Router();

const controller = require('./controller');
const auth = require('../auth');

router.get('/:id',auth.checkAdminOrOwn, controller.getClient);
router.get('/',auth.checkClient, controller.getClients);
router.post('/', controller.createClient);
router.post('/login', controller.loginClient);
router.post('/logout', auth.checkClient, controller.logoutClient);
router.put('/:id', auth.checkAdminOrOwn, controller.updateClient);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteClient);


module.exports = router;