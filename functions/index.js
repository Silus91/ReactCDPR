const functions = require('firebase-functions');
const app = require('express')();
const { getAllPosts, createPost } = require('./handlers/posts');
const { register, login, getAuthenticatedUser, logout } = require('./handlers/users');
const FBAuth = require('./utility/fbAuth');
const cors = require('cors');

app.use(cors({ origin: true }));

// Posts 
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, createPost);

//Register / login
app.post('/register', register); 
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/logout', logout);

exports.api = functions.https.onRequest(app);