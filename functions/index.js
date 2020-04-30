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

app.use(
  cors({
    origin: "https://cdred-project.web.app",
  })
);

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

exports.api = functions.https.onRequest(app);
