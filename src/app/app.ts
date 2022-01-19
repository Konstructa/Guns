import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import IndexRoutes from '../routes/index.routes';
import CostumerRoutes from '../routes/costumer.routes';
import OrderRoutes from '../routes/orders.routes';
import StockRoutes from '../routes/stock.routes';

dotenv.config();

export class App {
  private app : Application;

  // eslint-disable-next-line no-unused-vars
  constructor(private port ?: number | string) {
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
    this.app.use('/', IndexRoutes);
    this.app.use('/costumer', CostumerRoutes);
    this.app.use('/order', OrderRoutes);
    this.app.use('/stock', StockRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
