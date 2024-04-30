const Fakerator = require("fakerator");
const fakerator = Fakerator("de-DE");

const findCalendarEventsByUserEmail = (userEmail, page, pageSize) => {
  const events = [];

  for (let i = 0; i < 5000; i++) {
    events.push({
      id: fakerator.misc.uuid(),
      title: fakerator.entity.post().title,
      location: fakerator.address.street(),
      startDateTime: fakerator.date.future(1, "2024-12-12"),
      endDateTime: fakerator.date.future(1, "2024-12-12"),
      userEmail: userEmail,
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

module.exports = {
  findCalendarEventsByUserEmail,
};
