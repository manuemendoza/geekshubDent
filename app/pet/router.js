const router = require ('express').Router();

const controller = require ('./controller.js');
const auth = require('../auth');


router.post('/', auth.checkClient, controller.createPet);
router.get('/:id', auth.checkAdminOrOwn, controller.getPetById);
router.get('/', auth.checkAdminOrOwn, controller.getPets);
router.put('/:id', auth.checkAdminOrOwn, controller.updatePet);
router.delete('/:id', auth.checkAdminOrOwn, controller.deletePet);


module.exports = router;