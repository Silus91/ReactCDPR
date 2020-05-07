const Sentry = require("@sentry/node");

Sentry.init({
  dsn:
    "https://e32c6af99f7345d2b3108aa8615bd2c1@o388526.ingest.sentry.io/5225481",
  release: "cdred-project",
});

module.exports = Sentry;
