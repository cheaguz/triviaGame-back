var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categorycontroller');
/* GET home page. */


router.get('/', categoryController.getAll);
router.post('/',categoryController.new);


module.exports = router;