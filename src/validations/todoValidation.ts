import { Joi } from "express-validation";

export const todoValidation = {
    create: {
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            completed: Joi.boolean(),
        }),
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    },

    getAll: {
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    },

    getOne: {
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },

    update: {
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            completed: Joi.boolean(),
        }),
    },

    delete: {
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },

};