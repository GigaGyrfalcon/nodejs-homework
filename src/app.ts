import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './data-access/db';
import { userRouter } from './routers/user.router';
import { USERS as _USERS } from './data-access/seed/users';
import { User } from './models/user.model';

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (_, res: express.Response) => {
  res.send('Welcome to hell!');
});

app.use('/api/', userRouter);

sequelize
  .sync({
    logging: console.log,
    force: true
  })
  .then(async () => {
    try {
      await User.bulkCreate(_USERS);
      console.log('Seed users added successfully');
    } catch (error) {
      console.log(`Error during inserting data ${error}`);
    }
  })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});
