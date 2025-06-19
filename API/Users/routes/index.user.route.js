const app = require('express');
const userRouter = app.Router();
const getAllUsersController = require('../controllers/getAllUsers.controller.js');
const getUserByIdController = require('../controllers/getUserById.controller.js');
const editUserByIdController = require('../controllers/editUserById.controller.js');
const deleteUserByIdController = require('../controllers/deleteUserById.controller.js')

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.put('/:id', editUserByIdController);
userRouter.delete('/:id', deleteUserByIdController);

module.exports = userRouter;