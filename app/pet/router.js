const router = require ('express').Router();

const controller = require ('./controller.js');
const auth = require('../auth');


router.post('/',  controller.createPet);
router.get('/:id',auth.checkClient, controller.getPetById);
router.get('/',auth.checkClient, controller.getPets);
router.put('/:id', controller.updatePet);
router.delete('/:id', controller.deletePet);


module.exports = router;