const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  startDateTime: {
    type: String,
  },
  endDateTime: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("events", eventSchema);
