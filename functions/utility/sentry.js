const Sentry = require("@sentry/node");
const config = require("./config");

Sentry.init({
  dsn: config.sentryDSN,
  release: "cdred-project",
});

module.exports = Sentry;
