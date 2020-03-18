import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { getUserByLogin } from '../services';

export async function authenticate(req: Request, res: Response) {
  try {
    const privateKey = req.app.get('jwtPrivateKey');
    const user = await getUserByLogin(req.body.login);
    if (user !== null && compareSync(req.body.password, user.password)) {
      const payload = { sub: user.id, login: user.login };
      const token = sign(payload, privateKey, {
        expiresIn: '30s'
      });
      res.json(token);
    } else {
      throw 'User could not found';
    }
  } catch (error) {
    console.error({
      method: req.method,
      arguments: { ...req.params, ...req.query, ...req.body },
      error
    });
    res.status(401).json(error);
  }
}
