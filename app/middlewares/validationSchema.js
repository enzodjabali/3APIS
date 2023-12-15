const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});

const stationSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    openHour: Joi.string().max(5).required(),
    closeHour: Joi.string().max(5).required(),
});

const trainSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    departureDate: Joi.string().required(),
    startStation: Joi.string().required(),
    endStation: Joi.string().required(),
});

const ticketSchema = Joi.object({
    train: Joi.string().required(),
});

module.exports = { userSchema, stationSchema, trainSchema, ticketSchema };
