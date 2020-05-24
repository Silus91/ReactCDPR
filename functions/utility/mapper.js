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

exports.mapUserCredential = (newUser) => {
  const userCredentials = {
    handle: newUser.email,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    createdAt: new Date().toISOString(),
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/userImgs%2Fsamurai.png?alt=media&token=3a74747b-4740-40c6-b297-33d1599e4b14",
    userId,
  };
  return userCredentials;
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
