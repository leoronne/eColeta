const { Segments, Joi } = require("celebrate");

module.exports = {
  forgotpassword: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error("Invalid email!")),
    }),
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
  },
  updatepassword: {
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string()
        .required()
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
        .error(new Error("Invalid password!")),
    }),
    [Segments.QUERY]: Joi.object().keys({
      language: Joi.string().allow(null).error(new Error("Invalid language!")),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .required()
        .error(new Error("Authorization header is required!")),
      passtoken: Joi.string()
        .required()
        .token()
        .error(new Error("Invalid password token!")),
    }).unknown(),
  },
};
