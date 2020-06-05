import express, { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import path from 'path';

import routes from './routes';

require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());

// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { errors } = require('celebrate');

// const routes = require('./routes');

// const server = http.Server(app);

// app.use(cors());
// app.use(express.json());

// app.use('/', routes);

// app.use(errors());

app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {});
