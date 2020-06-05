import { Segments, Joi } from 'celebrate';

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().error(new Error('Name is a required field!')),
      email: Joi.string().required().email().error(new Error('Invalid email!')),
      whatsapp: Joi.string().required().error(new Error('Whats App is a required field!!')),
      latitude: Joi.number().required().error(new Error('Latitude is a required field!')),
      longitude: Joi.number().required().error(new Error('Longitude is a required field!')),
      uf: Joi.string().required().length(2).error(new Error('Invalid UF!')),
      city: Joi.string().required().error(new Error('City is a required field!')),
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
      uf: Joi.string().allow(null).length(2).error(new Error('Invalid UF!')),
      city: Joi.string().allow(null).error(new Error('Invalid City!')),
      items: Joi.string().allow(null).error(new Error('Invalid Items')),
    }),
  },
};
