const { db } = require('../utility/admin');
const firebase = require('firebase');
const config = require('../utility/config');
const { validateRegisterData, validateLoginData } = require('../utility/validaters');
firebase.initializeApp(config);

exports.register = (req,res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handle: req.body.email,
    photoURL: `https://s3.amazonaws.com/gt7sp-prod/decal/44/41/98/5846245245639984144_1.png`
  };
  
  const { valid, errors } = validateRegisterData(newUser);

  if(!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
  .then((doc) => {
    if(doc.exists) {
      return res.status(400).json({ email: "this email is taken"});
    } else {
      return firebase.auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
    }
  })
  .then((data) => {
    userId = data.user.uid;
    return data.user.getIdToken() 
  })
  .then((idToken) => {
    token = idToken;
    console.log("token", token);
    const userCredentials = {
      handle: newUser.email,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: new Date().toISOString(),
      photoURL: "https://s3.amazonaws.com/gt7sp-prod/decal/44/41/98/5846245245639984144_1.png",
      userId
    }
    return db.doc(`/users/${newUser.handle}`).set(userCredentials)
  })
  .then(() => {
    return res.status(201).json({ token });
  })
  .catch(err => {
    console.error(err);
    if(err.code === 'auth/email-already-in-use'){
      return res.status(400).json({ email: 'Email is in use'});
    } else {
      return res.status(500).json({ general:  'Something went wrong, please try again' });
    }
  })
  return;
}

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if(!valid) return res.status(400).json(errors);

  firebase.auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(data => {
    return data.user.getIdToken();
  })
  .then((token) => {
    return res.json({ token });
  })
  .catch((err) => {
    console.error(err);
    return res.status(403).json({ general: "Wrong credentials, please try again" });
  });
}

// get user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
  .get()
  .then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    userData.credentials = doc.data();
    return res.json(userData);
  })
  .catch((err) => {
    console.error(err);
    return res.status(404).json({ error: err.code });
  });
};

exports.logout = (req, res) => {
  firebase.auth().signOut()
  .then(() => {
    return res.status(200).json({ message: "Succes logout" })
  })
  .catch((err) => {
    console.error(err);
      return res.status(400).json({ general: "Wrong credentials, something went wrong" });
  });
}