const router = require('express').Router();
const controller = require('./controller');

router.get('/:id', controller.appoinmentGetById);
router.get('/', controller.appoinmentGetAll);
router.post('/', controller.appoinmentCreate);
// router.delete('/:id', controller.appoinmentDelete);

module.exports = router;