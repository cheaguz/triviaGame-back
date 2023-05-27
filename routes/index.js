var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const rankingRouter = require('./rankingRoute');
const questionRouter = require('./questionsRoute');
const categoryRouter = require('./categoryRoutes');


/* GET home page. */
router.use('/users', userRouter );
router.use('/ranking', rankingRouter);
router.use('/questions' , questionRouter);
router.use('/category' , categoryRouter);

module.exports = router;
