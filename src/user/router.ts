import express from 'express';
import Joi from 'joi';
import { User } from './model';
import * as controller from './controller';
import { schema } from './schema';

export const router = express.Router();

router.get('/', (_, res: express.Response) => {
  res.send('Welcome to the API hell!....');
});

// get user by ID
router.get('/user/:id', (req: express.Request, res: express.Response) => {
  res.json({
    isError: false,
    message: 'Get user by ID',
    data: { user: controller.getUserByID(req.params.id) }
  });
});

// get all users
router.get('/users', (req: express.Request, res: express.Response) => {
  res.json({
    isError: false,
    message: 'Get all users',
    data: { users: controller.getUsers(req.query) }
  });
});

// Add user
router.post('/users', (req: express.Request, res: express.Response) => {
  const result = Joi.validate(req.body, schema(true));
  const valid = result.error === null;
  if (valid) {
    const userId = controller.addUser(req.body);
    res.json({ isError: false, message: 'User created', data: { userId } });
  } else {
    res.status(400).json({ isError: true, message: result.error.message });
  }
});

// Update user
router.put('/user/:id', (req: express.Request, res: express.Response) => {
  const body: User = {
    login: req.body.login,
    password: req.body.password,
    age: req.body.age
  };
  const result = Joi.validate(body, schema(false));

  const valid = result.error === null;
  if (valid) {
    const result = controller.updateUser(req.params.id, body);
    if (result === 'ok') {
      res.json({
        isError: false,
        message: 'User created',
        data: { userId: req.params.id }
      });
    } else {
      res.status(400).json({ isError: true, message: 'Bad Request' });
    }
  } else {
    res.status(400).json({ isError: true, message: result.error.message });
  }
});

// Delete user
router.delete('/user/:id', (req: express.Request, res: express.Response) => {
  const result = controller.deleteUser(req.params.id);
  if (result === 'ok') {
    res.json({
      isError: false,
      message: 'User deleted',
      data: { userId: req.params.id }
    });
  } else {
    res.status(400).json({ isError: true, message: 'User could not deleted' });
  }
});
