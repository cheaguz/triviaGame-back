var express = require('express');
var router = express.Router();

const questionController = require('../controllers/questionController');
/* GET home page. */


 router.get('/', questionController.getAll);
 router.post('/',questionController.new);  
 router.get('/:id', questionController.getByCategory)
 router.post('/validate/:id' , questionController.validateResponse)

module.exports = router;