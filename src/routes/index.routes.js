const router = require('express').Router();
const userRouter = require('./user.routes.js');

router.use('/users', userRouter);

module.exports = router;