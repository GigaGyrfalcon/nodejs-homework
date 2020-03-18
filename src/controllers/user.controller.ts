import { Request, Response } from 'express';
import { validate } from 'joi';
import * as service from '../services/user.service';
import { UserInterface } from '../interfaces';
import { userSchema } from '../schemas';

export async function getUsers(req: Request, res: Response) {
  try {
    const result = await service.getUsers(req.query);
    if (!result.length) {
      throw 'Users could not found';
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
}

export async function getUserByPk(req: Request, res: Response) {
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
}

export async function addUser(req: Request, res: Response) {
  try {
    const validation = validate(req.body, userSchema(true));
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
}

export async function updateUser(req: Request, res: Response) {
  try {
    const body: UserInterface = {
      login: req.body.login,
      password: req.body.password,
      age: req.body.age
    };
    const validation = validate(body, userSchema(false));
    const valid = validation.error === null;
    if (valid) {
      const id = +req.params.id;
      const [result] = await service.updateUser(id, body);
      if (!result) {
        throw 'User did not update';
      }
      res.json(result);
    } else {
      throw validation.error.message;
    }
  } catch (error) {
    console.error({
      method: req.method,
      arguments: { ...req.params, ...req.query, ...req.body },
      error
    });
    res.status(400).json(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = +req.params.id;
    const [result] = await service.deleteUser(id);
    if (!result) {
      throw 'User did not delete';
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
}

export async function addUsersToGroup(req: Request, res: Response) {
  try {
    const body = {
      groupId: req.body.groupId as string,
      userIds: req.body.userIds as number[]
    };
    const result = await service.addUsersToGroup(body.groupId, body.userIds);
    if (!result.length) {
      throw 'Users could not added to group';
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
}
