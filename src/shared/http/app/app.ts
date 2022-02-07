import express, { Application } from 'express';
import 'dotenv/config';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import createConnection from '../../typeorm/database/db';

import IndexRoutes from '../routes/index.routes';

export class App {
  private app : Application;

  // eslint-disable-next-line no-unused-vars
  constructor(private port ?: number | string) {
    createConnection();
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 8080);
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use((req, res, next): void => {
      res.header('Access-Control-Allow-Origin', '');
      res.header('Access-Control-Allow-Headers', '');
      res.header('Access-Control-Allow-Methods', '');
      next();
    });
  }

  routes() {
    this.app.use(IndexRoutes);
  }

  async listen() {
    this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
