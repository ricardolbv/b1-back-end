const express = require('express');
const indexRouter = require('./index');
const usersRouter = require('./users');
const brandRouter = require('./brands');


module.exports = () => {
    const router = express.Router();
    router.use('/brands', brandRouter);
    router.use('/users', usersRouter);
    router.use('/', indexRouter);

    return router;
}