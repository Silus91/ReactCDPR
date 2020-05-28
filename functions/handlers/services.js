const { db } = require("../utility/admin");
const config = require("../utility/config");
const nodemailer = require("nodemailer");
const {
  validateNewEmail,
  validateNewSurvey,
} = require("../utility/validaters");
const Logger = require("../utility/logger");
const { emailMap, surveyMap } = require("../utility/mapper");
const logger = new Logger("app");

exports.sendEmail = async (req, res) => {
  const newEmail = await emailMap(req);
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

exports.sendSurvey = async (req, res) => {
  const newSurvey = await surveyMap(req);
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
