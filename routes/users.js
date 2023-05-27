var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.post('/register', userController.register);
router.get('/' , userController.getUsers);
router.post('/login',userController.login)

module.exports = router;
