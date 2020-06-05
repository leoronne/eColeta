const { Segments, Joi } = require("celebrate");

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().error(new Error("Invalid name!")),
      email: Joi.string().required().email().error(new Error("Invalid email!")),
      origin: Joi.string().allow(null).error(new Error("Invalid origin!")),
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
      password: Joi.string()
        .required()
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
        .error(new Error("Invalid password!")),
    }),
  },
  index: {
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .required()
        .error(new Error("Authorization header is required!")),
    }).unknown(),
  },
  delete: {
    [Segments.PARAMS]: {
      id: Joi.string()
        .required()
        .token()
        .min(4)
        .error(new Error("Invalid ID!")),
    },
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .required()
        .error(new Error("Authorization header is required!")),
    }).unknown(),
  },
  confirm: {
    [Segments.PARAMS]: {
      id: Joi.string()
        .required()
        .token()
        .min(4)
        .error(new Error("Invalid ID!")),
    },
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
  },
  sendemail: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error("Invalid email!")),
    }),
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
  },
  updateuser: {
    [Segments.BODY]: Joi.object().keys({
      field: Joi.string().valid('github_user', 'facebook_id', 'google_id', 'name', 'bio', 'create_password', 'update_password')
        .required()
        .error(new Error("Invalid field!")),
      value: Joi.string()
        .allow(null)
        .required()
        .error(new Error("Invalid value!")),
    }),
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .required()
        .error(new Error("Authorization header is required!")),
    }).unknown(),
  },
};
