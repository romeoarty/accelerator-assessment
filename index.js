const express = require("express");

require("dotenv").config();
require("./src/start/db");

const { SERVER_PORT } = require("./src/config");
const route = require("./src/routes");
const apiErrorHandler = require("./src/handlers/apiErrorHandler");
const defaultErrorHandler = require("./src/handlers/defaultErrorHandler");

const app = express();

app.use(express.json());

app.use("/api", route);

app.use(apiErrorHandler);
app.use(defaultErrorHandler);

app.listen(SERVER_PORT, console.log(`App listening on port ${SERVER_PORT}`));