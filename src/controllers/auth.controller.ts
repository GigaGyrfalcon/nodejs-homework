import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { User } from '../models';

export function authenticate(req: Request, res: Response) {
  (async () => {
    try {
      const privateKey = req.app.get('jwtPrivateKey');
      const user = await User.findOne({
        attributes: ['id', 'login', 'password'],
        where: {
          login: req.body.login
        },
        raw: true
      });
      if (user !== null && compareSync(req.body.password, user.password)) {
        const payload = { sub: user.id, login: user.login };
        const token = sign(payload, privateKey, {
          expiresIn: '30s'
        });
        res.json(token);
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error({
        method: req.method,
        arguments: { ...req.params, ...req.query, ...req.body },
        error
      });
      res.status(401).json(error);
    }
  })();
}
