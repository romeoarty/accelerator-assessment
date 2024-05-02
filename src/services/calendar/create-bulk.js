const { createBulkEvents } = require("../../repositories/calendar.repository");
const { message, validate } = require("../../utils/common");
const { eventBulkSchema } = require("./validation");
const { findOneByEmail } = require("../../repositories/user.repository");
const { STATUS, STATUS_TYPE } = require("../../constants");
const { ApiError } = require("../../handlers/errors");

const createBulk = async (body) => {
  const data = validate(eventBulkSchema, body);
  const user = await findOneByEmail(data.userEmail);
  if (!user) {
    throw new ApiError(
      "user_not_found",
      STATUS.NOT_FOUND,
      STATUS_TYPE.NOT_FOUND
    );
  }
  const bulkOps = [];
  for (const event of data.events) {
    let upsertDoc = {
      updateOne: {
        filter: {
          userId: user._id,
          _id: event.id,
        },
        update: {
          title: event.title,
          location: event.location,
          startDateTime: event.startDateTime,
          endDateTime: event.endDateTime,
        },
        upsert: true
      },
    };
    bulkOps.push(upsertDoc);
  }

  await createBulkEvents(bulkOps);
  return message("events_created");
};

module.exports = createBulk;
