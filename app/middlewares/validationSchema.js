const Joi = require('@hapi/joi');

// User

const createUserSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
});

const updateUserSchema = Joi.object({
    username: Joi.string().min(2).max(30),
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(2),
    role: Joi.string().max(20),
});

// Station

const createStationSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    openHour: Joi.string().max(5).required(),
    closeHour: Joi.string().max(5).required(),
});

const updateStationSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    openHour: Joi.string().max(5),
    closeHour: Joi.string().max(5),
});

// Train

const createTrainSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    departureDate: Joi.string().required(),
    startStation: Joi.string().required(),
    endStation: Joi.string().required(),
});

const updateTrainSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    departureDate: Joi.string(),
    startStation: Joi.string(),
    endStation: Joi.string(),
});

// Ticket

const createTicketSchema = Joi.object({
    train: Joi.string().required(),
});

const updateTicketSchema = Joi.object({
    owner: Joi.string(),
    train: Joi.string(),
    isValid: Joi.boolean(),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    createStationSchema,
    updateStationSchema,
    createTrainSchema,
    updateTrainSchema,
    createTicketSchema,
    updateTicketSchema
};
