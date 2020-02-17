import express from 'express';
import Joi from 'joi';
import * as service from '../services/group.service';
import { GroupInterface } from '../interfaces';
import { groupSchema } from '../schemas';

export function getGroupByPk(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const id = req.params.id;
      const result = await service.getGroupByPk(id);
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  })();
}

export function getGroups(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const result = await service.getGroups();
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  })();
}

export function addGroup(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const validation = Joi.validate(req.body, groupSchema(true));
      const valid = validation.error === null;
      if (valid) {
        const result = await service.addGroup(req.body);
        res.json(result);
      } else {
        res.status(400).json({ error: validation.error });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  })();
}

export function updateGroup(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const body: GroupInterface = {
        name: req.body.name,
        permissions: req.body.permissions
      };
      const validation = Joi.validate(body, groupSchema(false));
      const valid = validation.error === null;
      if (valid) {
        const id = req.params.id;
        const result = await service.updateGroup(id, body);
        res.json(result);
      } else {
        res.status(400).json({ message: validation.error.message });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  })();
}

export function deleteGroup(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const id = req.params.id;
      const result = await service.deleteGroup(id);
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  })();
}
