const { Router } = require("express");

const errorHandler = require("../handlers/errorHandler");
const { getCalendarEventsByUserEmail, createEvent } = require("../controllers/calendar.controller");

const router = Router();

router.route("/events")
    .get(errorHandler(getCalendarEventsByUserEmail))
    .post(errorHandler(createEvent));

module.exports = router;
