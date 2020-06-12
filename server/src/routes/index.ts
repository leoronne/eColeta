import express from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';

import knex from '../database/connection';

import ItemsController from '../app/controllers/ItemController';
import PointController from '../app/controllers/PointController';
import ContactController from '../app/controllers/ContactController';
const PointValidator = require('../validators/PointValidator');
const ContactValidator = require('../validators/ContactValidator');

const multerConfig = require('../config/multer');

const routes = express.Router();
const upload = multer(multerConfig);

const pointController = new PointController();

const contactController = new ContactController();

const itemsController = new ItemsController();

const Development = [
  'eColeta - NLW #1',
  {
    'Made by': 'Leonardo Ronne',
    GitHub: 'https://github.com/leoronne',
  },
];

routes
  //Copyright
  .get('/', (req, res, next) => {
    res.status(200).send({
      Development,
    });
  })
  //Contact
  .post('/contact', celebrate(ContactValidator.send), contactController.send)
  //Points
  .post('/points', celebrate(PointValidator.create), pointController.store)
  .post('/pointsimage/:id', upload.single('image'), pointController.uploadPhoto)
  .get('/points/:id', celebrate(PointValidator.show), pointController.show)
  .get('/points', celebrate(PointValidator.index), pointController.index)
  //Items
  .get('/items', itemsController.index);

export default routes;
