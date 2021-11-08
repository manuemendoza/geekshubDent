const router = require('express').Router();

const controller = require('./controller');
const auth = require('../auth.js');

router.get('/:id', auth.checkAdminOrOwn, controller.getUser);
router.get('/', auth.checkClient, controller.getUsers);
router.post('/', controller.createUser);
// router.post('/login', controller);
<<<<<<< HEAD
router.put('/:id', controller.updateUser);
router.delete('/id', controller.deleteUser);
=======
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);
>>>>>>> origin


module.exports = router;