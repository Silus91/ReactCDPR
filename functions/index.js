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
const logger = new Logger("app");

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

process.on("unhandledRejection", (error) => {
  logger.error(`Error At main page ${JSON.stringify(error)}`),
    console.log("unhandledRejection", JSON.stringify(error));
});
exports.api = functions.https.onRequest(app);

// // catch the uncaught errors that weren't wrapped in a domain or try catch statement
// // do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
// process.on('uncaughtException', function(err) {
//   // handle the error safely
//   console.log(err)
// })
