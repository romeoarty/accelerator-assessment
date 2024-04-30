const { Router } = require("express");

const router = Router();

const calendarRoute = require('./calendar.routes')

const routes = [
  { path: "/calendar", route: calendarRoute },
];

router.get("/", (req, res) => {
  res.send("Server is listening");
});

routes.forEach((r) => {
  router.use(r.path, r.route);
});

module.exports = router;
