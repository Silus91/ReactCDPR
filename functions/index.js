const functions = require('firebase-functions');
const app = require('express')();
const { sendEmail } = require('./handlers/services');
const { register, login, getAuthenticatedUser, logout } = require('./handlers/users');
const FBAuth = require('./utility/fbAuth');
const cors = require('cors');

app.use(cors({ origin: true }));

// Services 
app.post('/message', sendEmail);

//Register / login
app.post('/register', register); 
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/logout', logout);

exports.api = functions.https.onRequest(app);