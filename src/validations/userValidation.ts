import { Joi } from "express-validation";

export const userValidation = {

  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
    }),
  },

  login: {  
    body: Joi.alternatives().try(
      Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })
    ),
  },

  profile: {
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  },

  delete: {
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  },
};
