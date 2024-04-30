const {
  findCalendarEventsByUserEmail,
} = require("../../repositories/calendar.repository");
// const { findOneByEmail } = require("../../repositories/user.repository");
// const { STATUS, STATUS_TYPE } = require("../../constants");
// const { ApiError } = require("../../handlers/errors");
const { ok } = require("../../utils/common");

const getAll = async (userEmail, page, pageSize) => {
  // const user = await findOneByEmail(userEmail);
  // if (!user) {
  //   throw new ApiError(
  //     "user_not_found",
  //     STATUS.NOT_FOUND,
  //     STATUS_TYPE.NOT_FOUND
  //   );
  // }

  const calendarEvents = await findCalendarEventsByUserEmail(userEmail, page, pageSize);
  return ok(calendarEvents);
};

module.exports = getAll;
