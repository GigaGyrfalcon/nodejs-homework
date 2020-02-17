import express from 'express';
import * as controller from '../controllers/group.controller';

export const groupRouter = express.Router();

groupRouter.get('/:id', controller.getGroupByPk);
groupRouter.get('', controller.getGroups);
groupRouter.post('', controller.addGroup);
groupRouter.put('/:id', controller.updateGroup);
groupRouter.delete('/:id', controller.deleteGroup);
