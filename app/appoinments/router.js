const router = require('express').Router();

const controller = require('./controller');

// router.get('/:id', controller);
// router.get('/', controller);
router.post('/', controller.createAppoinment);
// router.put('/:id', controller);
// router.delete('/id', controller);

module.exports = router;