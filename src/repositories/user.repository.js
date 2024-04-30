const User = require("../models/user.model");

const findOneById = (id) => {
  return User.findById(id).lean();
};

const findOneByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (payload) => {
  const user = new User(payload);
  return user.save();
};

module.exports = { findOneById, findOneByEmail, createUser };
