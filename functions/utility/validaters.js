const isEmail = (email) => {
  // eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
    return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
    return false;
};

exports.validateRegisterData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email cant be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Password cant be empty';
  if (data.password !== data.confirmPassword) return  errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.handle)) errors.handle = 'Nick cant be empty';
  if (isEmpty(data.firstName)) errors.firstName = 'Where is your name';
  if (isEmpty(data.lastName)) errors.lastName = 'Where is your last name';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email cant be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }
  
  if (isEmpty(data.password)) errors.password = 'Password cant be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};