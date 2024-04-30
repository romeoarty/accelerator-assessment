const { ApiError } = require("./errors");
const lang = require("../lang");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    let errors = lang.en.errors;

    if (lang[req.headers.lang]) {
      errors = lang[req.headers.lang].errors;
    }

    res.status(err.status).send({
      message: errors[err.message] ?? err.message,
      status: err.status,
      type: err.type,
    });
  } else {
    next(err);
  }
};

module.exports = apiErrorHandler;
