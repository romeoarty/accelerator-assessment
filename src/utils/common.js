const { ApiError } = require("../handlers/errors");
const { STATUS, STATUS_TYPE } = require("../constants");
const { en } = require("../lang");

const ok = (data, status = "SUCCESS") => {
  return {
    data,
    status: STATUS[status] ?? STATUS.SUCCESS,
    type: STATUS_TYPE[status] ?? STATUS_TYPE.SUCCESS,
  };
};

const message = (key, status = "SUCCESS") => {
  return {
    message: en.messages[key] ?? key,
    status: STATUS[status] ?? STATUS.SUCCESS,
    type: STATUS_TYPE[status] ?? STATUS_TYPE.SUCCESS,
  };
};

const validate = (schema, body) => {
  const { value, error } = schema.validate(body);
  if (error) {
    throw new ApiError(
      error.message,
      STATUS.BAD_REQUEST,
      STATUS_TYPE.BAD_REQUEST
    );
  }

  return value;
};

module.exports = { ok, message, validate };
