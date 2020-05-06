const functions = require("firebase-functions");
const app = require("express")();
const { sendEmail, sendSurvey, getAllSurveys } = require("./handlers/services");
const {
  register,
  login,
  getAuthenticatedUser,
  logout,
  uploadImage,
} = require("./handlers/users");
const FBAuth = require("./utility/fbAuth");
const cors = require("cors");
const Logger = require("./logger/logger");
const bodyParser = require("body-parser");
const Sentry = require("@sentry/node");

const logger = new Logger("app");

app.use(
  Sentry.Handlers.requestHandler({
    serverName: false,
    user: ["dyczek.dawid@gmail.com"],
  })
);
app.use(cors({ origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Services
app.post("/message", sendEmail);
app.post("/survey", sendSurvey);
app.get("/getsurveys", getAllSurveys);

//Register / login
app.post("/register", register);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.post("/user/image", FBAuth, uploadImage);
app.post("/logout", logout);

app.use(Sentry.Handlers.errorHandler());

process.on("unhandledRejection", (error) => {
  logger.error(`Error unhandledRejection ${JSON.stringify(error)}`);
  console.log("unhandledRejection", JSON.stringify(error));
});
process.on("uncaughtException", (error) => {
  logger.error(`Error uncaughtException ${JSON.stringify(error)}`);
  console.log("uncaughtException", JSON.stringify(error));
});
exports.api = functions.https.onRequest(app);
