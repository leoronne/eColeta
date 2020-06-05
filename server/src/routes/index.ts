import express from 'express';
import { celebrate } from 'celebrate';
import knex from '../database/connection';

import ItemsController from '../app/controllers/ItemController';
import PointController from '../app/controllers/PointController';
const PointValidator = require('../validators/pointValidator');

const routes = express.Router();

const pointController = new PointController();

const itemsController = new ItemsController();

routes
  //Points
  .post('/points', celebrate(PointValidator.create), pointController.store)
  .get('/points/:id', celebrate(PointValidator.show), pointController.show)
  .get('/points', celebrate(PointValidator.index), pointController.index)
  //Items
  .get('/items', itemsController.index);

export default routes;
