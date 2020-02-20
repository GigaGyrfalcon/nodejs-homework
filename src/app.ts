import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './data-access/db';
import { userRouter, groupRouter } from './routers';
import { USERS as _USERS, GROUPS as _GROUPS } from './data-access/seed';
import { User, Group, UserGroup } from './models';
import { logger } from './utils/logger';

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req: express.Request, _, next: express.NextFunction) => {
  console.log({
    method: req.method,
    arguments: { ...req.params, ...req.query, ...req.body }
  });
  next();
});

app.use((req, res, next) => {
  const start: any = new Date();
  res.on('close', () => {
    const close: any = new Date();
    const executionTime: any = close - start;
    console.log(
      `${req.method} ${req.originalUrl} execution time: ${executionTime}ms`
    );
  });

  next();
});

app.get('/', (_, res: express.Response) => {
  res.send('Welcome to hell!');
});

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error(err.stack || '');
    res.status(500).send('Something broke!');
  }
);

(async () => {
  try {
    await sequelize.sync({
      logging: console.log,
      force: true
    });
    await User.bulkCreate(_USERS);
    await Group.bulkCreate(_GROUPS);

    User.belongsToMany(Group, {
      as: 'Group',
      through: 'UserGroup',
      foreignKey: 'userId'
    });
    Group.belongsToMany(User, {
      as: 'User',
      through: 'UserGroup',
      foreignKey: 'groupId'
    });
    User.hasMany(UserGroup, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'groups'
    });
    Group.hasMany(UserGroup, {
      sourceKey: 'id',
      foreignKey: 'groupId',
      as: 'users'
    });

    const user = await User.create({
      login: 'King',
      password: '12345678',
      age: 55,
      isDeleted: false
    });

    const user2 = await User.create({
      login: 'Queen',
      password: '87654321',
      age: 46,
      isDeleted: false
    });
    const group = await Group.create({
      name: 'Puppet',
      permissions: ['READ']
    });

    await UserGroup.create({ userId: user.id, groupId: group.id });
    await UserGroup.create({ userId: user2.id, groupId: group.id });

    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error(err);
  }
})();

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
