var express = require('express');
var router = express.Router();

const rankingController = require('../controllers/rankingController');

/* GET home page. */
router.get('/', rankingController.getAll);
router.post('/',rankingController.new);
module.exports = router;
