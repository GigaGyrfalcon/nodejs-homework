import { Request, Response } from 'express';
import { validate } from 'joi';
import * as service from '../services/group.service';
import { GroupInterface } from '../interfaces';
import { groupSchema } from '../schemas';

export async function getGroupByPk(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await service.getGroupByPk(id);
    if (!result) {
      throw 'Group could not found';
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

export async function getGroups(req: Request, res: Response) {
  try {
    const result = await service.getGroups();
    if (!result.length) {
      throw 'Groups could not found';
    }
    res.json(result);
  } catch (error) {
    console.error({
      method: req.method,
      arguments: { Params: req.params, Query: req.query },
      error
    });
    res.status(400).json(error);
  }
}

export async function addGroup(req: Request, res: Response) {
  try {
    const validation = validate(req.body, groupSchema(true));
    const valid = validation.error === null;
    if (valid) {
      const result = await service.addGroup(req.body);
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

export async function updateGroup(req: Request, res: Response) {
  try {
    const body: GroupInterface = {
      name: req.body.name,
      permissions: req.body.permissions
    };
    const validation = validate(body, groupSchema(false));
    const valid = validation.error === null;
    if (valid) {
      const id = req.params.id;
      const [result] = await service.updateGroup(id, body);
      if (!result) {
        throw 'Group did not update';
      }
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

export async function deleteGroup(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await service.deleteGroup(id);
    if (!result) {
      throw 'Group did not delete';
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
