const cron = require("node-cron");
const axios = require("axios");

const { createBulk, cleanUp } = require("../services/calendar");

let allEventIds = [];

const scheduler = cron.schedule(
  "0 */1 * * *",
  async () => {
    console.log("Scheduler is running...");
    const userEmails = [
      "mail1@ymail.com",
      "mail2@ymail.com",
      "mail3@ymail.com",
      "mail4@ymail.com",
      "mail5@ymail.com",
    ];

    for (const email of userEmails) {
      console.log("Getting events for: ", email);

      await getEventsAndProcessData(email, 1, 1000);
      await eventsCleanUp(email);

      console.log("Done Processing for: ", email);
    }
  },
  {
    scheduled: true,
  }
);

const getEventsAndProcessData = async (userEmail, page, pageSize) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/calendar/events/user/${userEmail}?page=${page}&pageSize=${pageSize}`
    );
    const events = response.data.data;

    if (!events?.records?.length) return;

    allEventIds = events.records.map((event) => event.id);

    const body = {
      userEmail,
      events: events.records
    };
    await createBulk(body);

    const nextPage = page + 1;
    if (nextPage <= events.totalPages) {
      console.log(
        `Calling for ${userEmail} for ${nextPage}${
          nextPage === 2 ? "nd time" : nextPage === 3 ? "rd time" : "th time"
        }`
      );

      await getEventsAndProcessData(userEmail, nextPage, pageSize);
    }
  } catch (error) {
    console.error(`Error fetching events for user ${userEmail}:`, error);
  }
};

const eventsCleanUp = async (userEmail) => {
  try {
    console.log("Starting events cleanup for: ", userEmail);

    if (!allEventIds?.length) return;
    await cleanUp(userEmail, allEventIds);

    console.log("Done events cleanup for: ", userEmail);
  } catch (error) {
    console.error(`Error cleaning up events for user ${userEmail}:`, error);
  } finally {
    allEventIds = [];
  }
};

module.exports = {
  scheduler,
};
