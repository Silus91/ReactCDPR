const winston = require("winston");
const Sentry = require("winston-transport-sentry-node").default;
const config = require("./config");

const options = {
  sentry: {
    dsn: config.sentryDSN,
  },
  level: "error",
};

const sentryInfo = {
  sentry: {
    dsn: config.sentryDSN,
  },
  level: "info",
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
        new Sentry(sentryInfo),
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
