const router = require ('express').Router();

const controller = require ('./controller.js');
const auth = require('../auth');


router.post('/',  controller.createPet);
router.get('/:id', controller.getPetById);
router.get('/', controller.getPets);
router.put('/:id', controller.updatePet);
router.delete('/:id', controller.deletePet);


module.exports = router;