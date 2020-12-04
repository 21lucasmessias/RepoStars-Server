import express from 'express';
import path from 'path';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';

import './database/conection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(3333);