const router = require('express').Router();

const controller = require('./controller');

// router.get('/:id', controller);
router.post('/', controller.createAppoinments);
// router.post('/', controller);
// router.put('/:id', controller);
// router.delete('/id', controller);

module.exports = router;