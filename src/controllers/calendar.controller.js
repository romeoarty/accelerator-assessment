const { getAll } = require("../services/calendar");

const getCalendarEventsByUserEmail = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const response = await getAll(req.query.email, page, pageSize);
  res.status(response.status).json(response);
};

module.exports = {
  getCalendarEventsByUserEmail,
};
