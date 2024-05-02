const { findOneByEmail } = require("../../repositories/user.repository");
const { STATUS, STATUS_TYPE } = require("../../constants");
const { ApiError } = require("../../handlers/errors");
const { ok } = require("../../utils/common");

const getByEmail = async (userEmail) => {
  const user = await findOneByEmail(userEmail);
  if (!user) {
    throw new ApiError(
      "user_not_found",
      STATUS.NOT_FOUND,
      STATUS_TYPE.NOT_FOUND
    );
  }
  return ok(user);
};

module.exports = getByEmail;
