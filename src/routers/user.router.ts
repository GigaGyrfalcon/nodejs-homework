import express from 'express';
import Joi from 'joi';
import { UserInterface } from '../interfaces';
import * as controller from '../controllers';
import { userSchema } from '../schemas';

export const userRouter = express.Router();

// Get user by Pk
userRouter.get('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const id = +req.params.id;
    const result = await controller.getUserByPk(id);
    res.json(result);
  })();
});

// Get all users
userRouter.get('', (req: express.Request, res: express.Response) => {
  (async () => {
    const result = await controller.getUsers(req.query);
    res.json(result);
  })();
});

// Add user
userRouter.post('', (req: express.Request, res: express.Response) => {
  (async () => {
    const validation = Joi.validate(req.body, userSchema(true));
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
userRouter.put('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const body: UserInterface = {
      login: req.body.login,
      password: req.body.password,
      age: req.body.age
    };
    const validation = Joi.validate(body, userSchema(false));
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
userRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const id = +req.params.id;
    const result = await controller.deleteUser(id);
    res.json(result);
  })();
});

// Add users to group
userRouter.post(
  '/addUsersToGroup',
  (req: express.Request, res: express.Response) => {
    (async () => {
      const body = {
        groupId: req.body.groupId as string,
        userIds: req.body.userIds as number[]
      };
      const result = await controller.addUsersToGroup(
        body.groupId,
        body.userIds
      );
      res.json(result);
    })();
  }
);
