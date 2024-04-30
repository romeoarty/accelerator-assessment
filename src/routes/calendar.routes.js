const { Router } = require("express");

const errorHandler = require("../handlers/errorHandler");
const { getCalendarEventsByUserEmail } = require("../controllers/calendar.controller");

const router = Router();

router.route("/events").get(errorHandler(getCalendarEventsByUserEmail));

module.exports = router;
