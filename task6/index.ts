import * as express from 'express';
import routes from './src/routes/routes';
import * as bodyParser from 'body-parser';
import { errorMiddleware } from './src/middleware/error.middleware';
import { logger } from './src/logger/logger';
import { checkToken } from './src/middleware/check-token.middleware';
import * as cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/users/', checkToken);
app.use('/groups/', checkToken);

//body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
// serving static files

app.use(express.static('public'));

import db from "./src/models";
db.sequelize.sync();

app.use(errorMiddleware);

process
  .on('uncaughtException', err => {
    logger.error('uncaughtException');
    process.exit(1);
  })
  .on('unhandledRejection', (reason, p) => {
    logger.error('unhandledRejection');
  });

app.get('/', (req, res) =>
  res.send(`Node and express server running on post ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Your server is running on port ${PORT}`)
);
