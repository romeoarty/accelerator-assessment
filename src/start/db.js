const mongoose = require("mongoose");

const { MONGODB_URI } = require("../config");

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("MongoDB Connected."));
