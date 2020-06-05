const { Segments, Joi } = require("celebrate");

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error("Invalid email!")),
      password: Joi.string()
        .required()
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
        .error(new Error("Invalid password!")),
      origin: Joi.string().allow(null).error(new Error("Invalid origin!")),
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
  },
  createsocial: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error("Invalid email!")),
      name: Joi.string().required().error(new Error("Invalid name!")),
      id: Joi.string().required().error(new Error("Invalid social ID!")),
      image: Joi.string().required().error(new Error("Invalid avatar url!")),
      origin: Joi.string().allow(null).error(new Error("Invalid origin!")),
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
  },
  validateToken: {
    [Segments.QUERY]: {
      token: Joi.string()
        .required()
        .error(new Error("Authorization header is required!")),

      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    },
  },
};
