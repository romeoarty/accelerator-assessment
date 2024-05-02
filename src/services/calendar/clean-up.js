const { deleteEventsByIds } = require("../../repositories/calendar.repository");
const { message, validate } = require("../../utils/common");
const { eventsCleanUpSchema } = require("./validation");
const { findOneByEmail } = require("../../repositories/user.repository");
const { STATUS, STATUS_TYPE } = require("../../constants");
const { ApiError } = require("../../handlers/errors");

const cleanUp = async (userEmail, eventIds) => {
  const user = await findOneByEmail(userEmail);
  if (!user) {
    throw new ApiError(
      "user_not_found",
      STATUS.NOT_FOUND,
      STATUS_TYPE.NOT_FOUND
    );
  }

  const body = {
    userId: String(user._id),
    eventIds,
  };

  const data = validate(eventsCleanUpSchema, body);

  await deleteEventsByIds({ ...data });
  return message("events_delete");
};

module.exports = cleanUp;
