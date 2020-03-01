import express from 'express';
import * as controller from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/:id', controller.getUserByPk);
userRouter.get('', controller.getUsers);
userRouter.post('', controller.addUser);
userRouter.put('/:id', controller.updateUser);
userRouter.delete('/:id', controller.deleteUser);
userRouter.post('/addUsersToGroup', controller.addUsersToGroup);
