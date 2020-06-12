import { Segments, Joi } from 'celebrate';

module.exports = {
  send: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().error(new Error('Invalid name!')),
      email: Joi.string().required().email().error(new Error('Invalid email!')),
      message: Joi.string().required().error(new Error('Invalid message!')),
    }),
  },
};
