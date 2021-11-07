const router = require('express').Router();

const controller = require('./controller');
const auth = require('../auth.js');

router.get('/:id', auth.checkAdminOrOwn, controller.getUser);
router.get('/', auth.checkAdminOrOwn, controller.getUsers);
router.post('/', auth.checkAdminOrOwn, controller.createUser);
router.post('/login', controller.loginUser);
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);

module.exports = router;