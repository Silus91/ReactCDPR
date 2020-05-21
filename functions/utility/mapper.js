exports.mapLogin = (req) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  return user;
};

exports.mapRegister = (req) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handle: req.body.email,
  };
  return newUser;
};

exports.emailMap = (req) => {
  const newEmail = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
  };
  return newEmail;
};

exports.surveyMap = (req) => {
  const newSurvey = {
    opinion: req.body.opinion,
    rating: req.body.rating,
    createdAt: new Date().toISOString(),
  };
  return newSurvey;
};
