module.exports = class ApiError {
  constructor(message, status, type) {
    this.message = message;
    this.status = status;
    this.type = type;
  }
};
