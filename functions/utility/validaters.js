const isEmail = (email) => {
  // eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  return false;
};

const tooLong = (string) => {
  if (string.length > 30) return true;
  return false;
};

const tooShort = (string) => {
  if (string.length < 6) return true;
  return false;
};

exports.validateRegisterData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email cant be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password cant be empty";
  } else if (tooShort(data.password)) {
    errors.password = "Minimum 6 char password";
  }
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(data.confirmPassword))
    errors.confirmPassword = "Confirm Password cant be empty";
  if (isEmpty(data.firstName)) errors.firstName = "Where is your name";
  if (isEmpty(data.lastName)) errors.lastName = "Where is your last name";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email cant be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Password cant be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateNewEmail = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email cant be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.name)) errors.name = "Name cant be empty";
  if (isEmpty(data.message)) errors.message = "Message cant be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateNewSurvey = (data) => {
  let errors = {};
  if (isEmpty(data.opinion)) {
    errors.opinion = "Opinion cant be empty";
  } else if (tooLong(data.opinion)) {
    errors.opinion = "Too long opinion sorry max 30 characters";
  }
  if (data.rating < 1) errors.rating = "Leave some rating please";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
