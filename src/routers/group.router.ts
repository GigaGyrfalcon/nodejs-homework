import express from 'express';
import Joi from 'joi';
import { GroupInterface } from '../interfaces';
import * as controller from '../controllers/group.controller';
import { groupSchema } from '../schemas';

export const groupRouter = express.Router();

// Get group by Pk
groupRouter.get('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const id = req.params.id;
    const result = await controller.getGroupByPk(id);
    res.json(result);
  })();
});

// Get all groups
groupRouter.get('', (req: express.Request, res: express.Response) => {
  (async () => {
    const result = await controller.getGroups();
    res.json(result);
  })();
});

// Add group
groupRouter.post('', (req: express.Request, res: express.Response) => {
  (async () => {
    const validation = Joi.validate(req.body, groupSchema(true));
    const valid = validation.error === null;
    if (valid) {
      const result = await controller.addGroup(req.body);
      res.json(result);
    } else {
      res.status(400).json({ isError: true, error: validation.error });
    }
  })();
});

// Update group
groupRouter.put('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const body: GroupInterface = {
      name: req.body.name,
      permissions: req.body.permissions
    };
    const validation = Joi.validate(body, groupSchema(false));
    const valid = validation.error === null;
    if (valid) {
      const id = req.params.id;
      const result = await controller.updateGroup(id, body);
      res.json(result);
    } else {
      res
        .status(400)
        .json({ isError: true, message: validation.error.message });
    }
  })();
});

// Delete group
groupRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  (async () => {
    const id = req.params.id;
    const result = await controller.deleteGroup(id);
    res.json(result);
  })();
});
