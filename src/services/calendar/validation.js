const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const eventSchema = Joi.object({
  id: Joi.objectId(),
  title: Joi.string().required(),
  location: Joi.string(),
  startDateTime: Joi.date(),
  endDateTime: Joi.date(),
  userId: Joi.string().required(),
});

const eventsCleanUpSchema = Joi.object({
  eventIds: Joi.array().items(Joi.string()).required(),
  userId: Joi.string().required(),
});

module.exports = { eventSchema, eventsCleanUpSchema };
