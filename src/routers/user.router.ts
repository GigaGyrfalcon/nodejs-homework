import express from 'express';
import Joi from 'joi';
import { UserInterface } from '../interfaces';
import * as controller from '../controllers/user.controller';
import { schema } from '../schemas/user.schema';

export const userRouter = express.Router();

// Get user by Pk
userRouter.get('/user/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const id = +req.params.id;
    const result = await controller.getUserByPk(id);
    res.json(result);
  })();
});

// Get all users
userRouter.get('/users', (req: express.Request, res: express.Response) => {
  (async () => {
    const result = await controller.getUsers(req.query);
    res.json(result);
  })();
});

// Add user
userRouter.post('/users', (req: express.Request, res: express.Response) => {
  (async () => {
    const validation = Joi.validate(req.body, schema(true));
    const valid = validation.error === null;
    if (valid) {
      const result = await controller.addUser(req.body);
      res.json(result);
    } else {
      res.status(400).json({ isError: true, error: validation.error });
    }
  })();
});

// Update user
userRouter.put('/user/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const body: UserInterface = {
      login: req.body.login,
      password: req.body.password,
      age: req.body.age
    };
    const validation = Joi.validate(body, schema(false));
    const valid = validation.error === null;
    if (valid) {
      const id = +req.params.id;
      const result = await controller.updateUser(id, body);
      res.json(result);
    } else {
      res
        .status(400)
        .json({ isError: true, message: validation.error.message });
    }
  })();
});

// Delete user
userRouter.delete(
  '/user/:id',
  (req: express.Request, res: express.Response) => {
    (async () => {
      const id = +req.params.id;
      const result = await controller.deleteUser(id);
      res.json(result);
    })();
  }
);
