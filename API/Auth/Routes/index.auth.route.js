const express = require('express');
const authRouter = express.Router();
const { registerRouter, loginRouter , logoutRouter } = require('./registerAndLoginAndLogout.route');


authRouter.post('/register',registerRouter)
authRouter.post('/login', loginRouter);
authRouter.post('/logout', logoutRouter);

module.exports = authRouter;