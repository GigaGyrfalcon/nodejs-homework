import express from 'express';
import Joi from 'joi';
import * as service from '../services/user.service';
import { UserInterface } from '../interfaces';
import { userSchema } from '../schemas';

export function getUsers(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const result = await service.getUsers(req.query);
      res.json(result);
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}

export function getUserByPk(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const id = +req.params.id;
      const result = await service.getUserByPk(id);
      if (!result) {
        throw 'User could not found';
      }
      res.json(result);
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}

export function addUser(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const validation = Joi.validate(req.body, userSchema(true));
      const valid = validation.error === null;
      if (valid) {
        const result = await service.addUser(req.body);
        res.json(result);
      } else {
        throw validation.error;
      }
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}

export function updateUser(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const body: UserInterface = {
        login: req.body.login,
        password: req.body.password,
        age: req.body.age
      };
      const validation = Joi.validate(body, userSchema(false));
      const valid = validation.error === null;
      if (valid) {
        const id = +req.params.id;
        const result = await service.updateUser(id, body);
        res.json(result);
      } else {
        res.status(400).json({ message: validation.error.message });
      }
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}

export function deleteUser(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const id = +req.params.id;
      const result = await service.deleteUser(id);
      res.json(result);
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}

export function addUsersToGroup(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const body = {
        groupId: req.body.groupId as string,
        userIds: req.body.userIds as number[]
      };
      const result = await service.addUsersToGroup(body.groupId, body.userIds);
      res.json(result);
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(400).json(error);
    }
  })();
}
