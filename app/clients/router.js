const router = require('express').Router();

const controller = require('./controller');
const auth = require('../auth.js');

router.get('/:id', auth.checkAdminOrOwn, controller.getUser);
router.get('/', auth.checkClient, controller.getUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
// router.post('/logout', controller);
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);


module.exports = router;