const { db } = require("../utility/admin");
const config = require("../utility/config");
const nodemailer = require("nodemailer");
const {
  validateNewEmail,
  validateNewSurvey,
} = require("../utility/validaters");
var request = require("request");
const Logger = require("../utility/logger");
const logger = new Logger("app");

exports.sendEmail = async (req, res) => {
  const newEmail = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
  };
  const { valid, errors } = validateNewEmail(newEmail);
  if (!valid) return res.status(400).json(errors);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.trialEmail,
      pass: config.trialEmailPassword,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: newEmail.email,
      to: config.trialEmail,
      subject: `New Email from ${newEmail.name} about cdred-project`,
      text: newEmail.message,
    });
    logger.info(`Email was send Sucessfuly by ${newEmail.email}`);
    return res.status(201).json({ "Message send": info });
  } catch (error) {
    logger.error(`Error At Trying to Send Email ${JSON.stringify(error)}`);
    return res.status(400).json({ error });
  }
};

exports.sendSurvey = (req, res) => {
  const newSurvey = {
    opinion: req.body.opinion,
    rating: req.body.rating,
    createdAt: new Date().toISOString(),
  };

  const { valid, errors } = validateNewSurvey(newSurvey);
  if (!valid) return res.status(400).json(errors);

  db.collection("surveys")
    .add(newSurvey)
    .then((doc) => {
      const resSurvey = newSurvey;
      resSurvey.surveyId = doc.id;
      logger.info(`Survey Was submited ${resSurvey.opinion}`);
      return res.status(201).json({ resSurvey });
    })
    .catch((error) => {
      logger.error(`Error At Trying to send Survey ${JSON.stringify(error)}`);
      res.status(404).json({ error: "something went wrong" });
      console.error(error);
    });
};

exports.getAllSurveys = (req, res) => {
  let surveys = [];
  db.collection("surveys")
    .orderBy("rating", "desc")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        surveys.push({
          surveyId: doc.id,
          opinion: doc.data().opinion,
          rating: doc.data().rating,
          createdAt: doc.data().createdAt,
        });
      });
      return res.status(200).json(surveys);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error.code });
    });
};

exports.getStockValue = (req, res) => {
  const value = req.body.stockDays;

  const url = config.stockMarketURL;
  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        console.log(data.html_url);
      }

      //sprawdzic co dostajemy spowrotem
      // return res.status(200).json(stockValue);
    }
  );
};
