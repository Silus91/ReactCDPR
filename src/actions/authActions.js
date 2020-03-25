import { 
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTH,
  LOADING_UI,
  LOADING_USER,
} from '../types/types';
import axios from 'axios';
import app from '../components/Firebase/Firebase';
import db from '../components/Firebase/Firestore';

const firebase = require('firebase');
const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';

export const loginAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}login`, userData)
  .then((res) => {
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
      })
  })
}

export const loginFbAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.FacebookAuthProvider(); 


  // skrocici ta funkcje trzeba zeby dziala
  socialLogin(provider)
  .then(() => {
    app.auth().onAuthStateChanged((user) => {
      if (!user) {
        return null;
      }
    })
    app.auth().currentUser.getIdToken()
    .then((idToken)=> {
      setAuthorizationHeader(idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      // history.push('/');
    })
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response
    })
  })
}

export const loginGoogleAction = (history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.GoogleAuthProvider(); 

  app.auth().signInWithPopup(provider).then((res) => {
    
    const name = res.user.displayName.split(" ");
    const firstName = name[0];
    const lastName = name[1];

    console.log("name", name);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: res.user.email,
      handle: res.user.displayName,
      createdAt: new Date().toISOString(),
      userId: res.user.uid
    }
    console.log("newuser", newUser);
    db.doc(`/users/${newUser.handle}`).get()
    .then((doc) => {
      if(doc.exists) {
        return console.log("user already exists");
      } else {
        return db.doc(`/users/${newUser.handle}`).set(newUser)
      }
    })
  })
  .then(() => {
    app.auth().onAuthStateChanged((user) => {
      if (!user) {
        return null;
      }
    })
    app.auth().currentUser.getIdToken()
    .then((idToken)=> {
      setAuthorizationHeader(idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response
    })
  })
}

export const registerAction = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}register`, newUserData)
  .then(res => {
    setAuthorizationHeader(res.data.token);
    dispatch({ type: CLEAR_ERRORS });
    dispatch(getUserData());
    history.push('/');
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get(`${BASE_URL}user`).then((res) => {
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  })
}

export const logout = () => async (dispatch) => {
  const result = await axios.post(`${BASE_URL}logout`);
  console.log(result);
  localStorage.removeItem('FBidToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTH});
}

const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem('FBidToken', FBidToken);
  axios.defaults.headers.common['Authorization'] = FBidToken;
};


const socialLogin = (provider) => (dispatch) => {
  app.auth().signInWithPopup(provider).then((res) => {
    
    const name = res.user.displayName.split(" ");
    const firstName = name[0];
    const lastName = name[1];

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: res.user.email,
      handle: `${firstName}${lastName}`,
      createdAt: new Date().toISOString(),
      userId: res.user.uid

    }
    db.doc(`/users/${newUser.handle}`).get()
    .then((doc) => {
      if(doc.exists) {
        return console.log("user already exists");
      } else {
        return db.doc(`/users/${newUser.handle}`).set(newUser)
      }
    })
  })
  
}
