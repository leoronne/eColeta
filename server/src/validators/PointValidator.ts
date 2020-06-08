import { Segments, Joi } from 'celebrate';

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().error(new Error('Name is a required field!')),
      email: Joi.string().required().email().error(new Error('Invalid email!')),
      whatsapp: Joi.string().required().error(new Error('Whats App is a required field!!')),
      latitude: Joi.number().required().error(new Error('Latitude is a required field!')),
      longitude: Joi.number().required().error(new Error('Longitude is a required field!')),
      address: Joi.string().required().error(new Error('address is a required field!')),
      compound: Joi.string().required().error(new Error('Compound is a required field!')),
      items: Joi.array().items(Joi.number().integer().required()).required().error(new Error('Invalid items!')),
    }),
  },
  show: {
    [Segments.PARAMS]: {
      id: Joi.number().integer().required().error(new Error('Invalid ID!')),
    },
  },
  index: {
    [Segments.QUERY]: Joi.object().keys({
      address: Joi.string().allow(null).error(new Error('Invalid address!')),
      compound: Joi.string().allow(null).error(new Error('Invalid Compound!')),
      items: Joi.string().allow(null).error(new Error('Invalid Items')),
    }),
  },
};
