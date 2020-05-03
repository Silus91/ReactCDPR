const { db } = require("../utility/admin");
const nodemailer = require("nodemailer");
const {
  validateNewEmail,
  validateNewSurvey,
} = require("../utility/validaters");

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
      user: "georgiana.sporer73@ethereal.email",
      pass: "dntDgNAf9qHSzG7sWs",
    },
  });
  try {
    let info = await transporter.sendMail({
      from: newEmail.email,
      to: "georgiana.sporer73@ethereal.email",
      subject: newEmail.name,
      text: newEmail.message,
    });
    console.log(info);

    return res.status(201).json({ "Message send": info });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
//mandrill
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
      return res.status(201).json({ resSurvey });
    })
    .catch((err) => {
      res.status(404).json({ error: "something went wrong" });
      console.error(err);
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
      return res.json(surveys);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
