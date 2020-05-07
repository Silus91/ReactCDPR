const winston = require("winston");
const Sentry = require("winston-transport-sentry-node").default;

const options = {
  sentry: {
    dsn:
      "https://e32c6af99f7345d2b3108aa8615bd2c1@o388526.ingest.sentry.io/5225481",
  },
  level: "error",
};
const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

class LoggerService {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: `./logs/info.log`,
          level: "info",
        }),
        new winston.transports.File({
          filename: `./logs/error.log`,
          level: "error",
        }),
        new Sentry(options),
      ],
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        } | `;
        message = info.obj
          ? message + `data:${JSON.stringify(info.obj)} | `
          : message;
        message = this.log_data
          ? message + `log_data:${JSON.stringify(this.log_data)} | `
          : message;
        return message;
      }),
    });
    this.logger = logger;
  }
  setLogData(log_data) {
    this.log_data = log_data;
  }
  async info(message) {
    this.logger.log("info", message);
  }
  async debug(message) {
    this.logger.log("debug", message);
  }
  async error(message) {
    this.logger.log("error", message);
  }
}
module.exports = LoggerService;
