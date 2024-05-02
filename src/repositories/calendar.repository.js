const Fakerator = require("fakerator");
const fakerator = Fakerator("de-DE");
const mongoose = require("mongoose");

const Event = require("../models/event.model");
const { getPaginatedRecords } = require("../utils/helper");

const findCalendarEventsByUserId = (userId, page, pageSize) => {
  const events = [];

  for (let i = 0; i < 5000; i++) {
    events.push({
      id: new mongoose.Types.ObjectId(),
      title: fakerator.entity.post().title,
      location: fakerator.address.street(),
      startDateTime: fakerator.date.future(1, "2024-12-12"),
      endDateTime: fakerator.date.future(1, "2024-12-12"),
      userId: userId,
    });
  }

  const totalEvents = 5000;
  const paginatedEvents = getPaginatedRecords(page, pageSize, events);

  return {
    totalRecords: totalEvents,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
    records: paginatedEvents,
  };
};

const createBulkEvents = async (payload) => await Event.bulkWrite(payload);

const deleteEventsByIds = (payload) =>
  Event.deleteMany({
    userId: payload.userId,
    _id: { $nin: payload.eventIds },
  });

module.exports = {
  findCalendarEventsByUserId,
  createBulkEvents,
  deleteEventsByIds,
};
