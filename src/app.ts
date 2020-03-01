import express, { Application, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import {
  requestLoging,
  executionTimeLoging,
  serverErrorLoging,
  verifyJWTToken
} from './middlewares';
import { sequelizer } from './data-access/sequelizer';
import { authRouter, userRouter, groupRouter } from './routers';
import './utils/passport';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.customMiddlewares();
    sequelizer();
    this.routes();
  }

  public config(): void {
    const { app } = this;
    app.set('port', process.env.PORT || 3000);
    app.set('jwtPrivateKey', process.env.JWT_PRIVATE_KEY || 'some_private_key');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(cors());
    app.use(helmet());
  }

  private customMiddlewares(): void {
    const { app } = this;
    app.use(requestLoging);
    app.use(executionTimeLoging);
    app.use(serverErrorLoging);
    process
      .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
      })
      .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
      });
  }

  public routes(): void {
    const { app } = this;
    app.get('/', (_, res: Response) => res.send('Welcome to hell!'));
    app.use('/api/auth', authRouter);
    app.use('/api/users', verifyJWTToken, userRouter);
    app.use('/api/groups', verifyJWTToken, groupRouter);
  }

  public start(): void {
    const port = this.app.get('port');
    this.app.listen(port, function() {
      console.log(`App listening on port ${port}!`);
    });
  }
}

const server = new Server();

server.start();
