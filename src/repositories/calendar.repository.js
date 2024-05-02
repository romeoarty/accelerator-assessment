const Event = require("../models/event.model");
const Fakerator = require("fakerator");
const fakerator = Fakerator("de-DE");
const mongoose = require('mongoose');

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

const getPaginatedRecords = (page, pageSize, records) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return records.slice(startIndex, endIndex);
};

const createEvent = async (payload) => {
  const result = await Event.findOneAndUpdate(
    {
      userId: payload.userId,
      _id: payload?.id,
    },
    {
      title: payload.title,
      location: payload.location,
      startDateTime: payload.startDateTime,
      endDateTime: payload.endDateTime
    },
    {
      upsert: true,
      new: true,
      omitUndefined: true,
    },
  );
  return result;
};

const deleteEventsByIds = async (payload) => {
  const result = await Event.deleteMany({
    userId: payload.userId,
    _id: { $nin: payload.eventIds }
  });
  
  return result;
}

module.exports = {
  findCalendarEventsByUserId,
  createEvent,
  deleteEventsByIds
};
