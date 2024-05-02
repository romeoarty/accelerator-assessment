const User = require("../models/user.model");

const dummyUsers = [
  { fullName: "Mail 1", email: "mail1@ymail.com" },
  { fullName: "Mail 2", email: "mail2@ymail.com" },
  { fullName: "Mail 3", email: "mail3@ymail.com" },
  { fullName: "Mail 4", email: "mail4@ymail.com" },
  { fullName: "Mail 5", email: "mail5@ymail.com" },
];

async function addDummyUsers() {
  try {
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
      await User.insertMany(dummyUsers);
      console.log("Dummy users were added successfully");
    }
  } catch (error) {
    console.error("Error adding dummy users:", error);
  }
}

module.exports = {
  addDummyUsers,
};
