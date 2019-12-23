import express from 'express';
import bodyParser from 'body-parser';
import { router } from './user/router';

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/', router);

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});
