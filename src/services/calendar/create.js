const { createEvent } = require("../../repositories/calendar.repository");
const { message, validate } = require("../../utils/common");
const { eventSchema } = require("./validation");

const create = async (body) => {
  const data = validate(eventSchema, body);

  await createEvent({ ...data });
  return message("event_created");
};

module.exports = create;
