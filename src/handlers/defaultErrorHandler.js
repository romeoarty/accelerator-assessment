const { STATUS, STATUS_TYPE } = require("../constants");

// eslint-disable-next-line no-unused-vars
const defaultErrorHandler = (err, req, res, next) => {
  res.status(err.status ?? STATUS.INTERNAL_SERVER_ERROR).send({
    message: err.toString() ?? "Something went wrong!",
    status: err.status ?? STATUS.INTERNAL_SERVER_ERROR,
    type: err.type ?? STATUS_TYPE.INTERNAL_SERVER_ERROR,
  });
};

module.exports = defaultErrorHandler;
