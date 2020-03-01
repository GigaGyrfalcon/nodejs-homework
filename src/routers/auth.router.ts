import express from 'express';
import * as controller from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', controller.authenticate);
