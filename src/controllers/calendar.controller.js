const { getEventsByEmail } = require("../services/calendar");

const getCalendarEventsByUserEmail = async ({query, params}, res) => {
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;

  const response = await getEventsByEmail(params.email, page, pageSize);
  res.status(response.status).json(response);
};

module.exports = {
  getCalendarEventsByUserEmail
};
