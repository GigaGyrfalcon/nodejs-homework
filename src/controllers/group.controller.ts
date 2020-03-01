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
  })();
}

export function getGroups(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const result = await service.getGroups();
      res.json(result);
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { Params: req.params, Query: req.query },
        error
      });
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

export function deleteGroup(req: express.Request, res: express.Response) {
  (async () => {
    try {
      const id = req.params.id;
      const result = await service.deleteGroup(id);
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
