/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import knex from 'knex';

const configuration = require('../../knexfile');

require('dotenv/config');

const config = process.env.DBAMBIENT === 'development' ? configuration.development : process.env.DBAMBIENT === 'production' ? configuration.production : configuration.test;

const connection = knex(config);

export default connection;
