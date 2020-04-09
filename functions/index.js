const functions = require('firebase-functions');
const app = require('express')();
const { getAllPosts, createPost, sendEmail } = require('./handlers/services');
const { register, login, getAuthenticatedUser, logout, getAuthenticatedTrialUser } = require('./handlers/users');
const FBAuth = require('./utility/fbAuth');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cors({ origin: true }));

// Posts 
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, createPost);
app.post('/message', sendEmail)

//Register / login
app.post('/register', register); 
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/logout', logout);

exports.api = functions.https.onRequest(app);