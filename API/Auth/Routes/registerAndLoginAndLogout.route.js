const express = require('express')
const registerRouter = express.Router();
const loginRouter = express.Router();
const register = require('../Controllers/register.controller.js');
const login = require('../Controllers/login.controller.js');
const logoutRouter = require('../Controllers/logout.controller.js');



registerRouter.post("/register", register);
loginRouter.post("/login", login);
logoutRouter.post("/logout", logoutRouter);

module.exports = {
    registerRouter,
    loginRouter,
    logoutRouter
}