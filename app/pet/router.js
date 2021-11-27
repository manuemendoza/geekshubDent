const router = require ('express').Router();

const controller = require ('./controller.js');
const auth = require('../../auth');


router.post('/',auth.checkUser, controller.createPet);
router.get('/:id', auth.checkUser, controller.getPetById);
router.get('/', auth.checkUser, controller.getPets);
router.put('/:id', auth.checkUser, controller.updatePet);
router.delete('/:id', auth.checkUser, controller.deletePet);


module.exports = router;