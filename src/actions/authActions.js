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
    const FBidToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBidToken', FBidToken)
    axios.defaults.headers.common['Authorization'] = FBidToken;
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
  provider.addScope('user_birthday');

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
        return console.log("user exists");
      } else {
        return db.doc(`/users/${newUser.handle}`).set(newUser)
      }
    })
    console.log(res);
    const FBidToken = `Bearer ${res.credential.accessToken}`;
    console.log("token", FBidToken);
    localStorage.setItem('FBidToken', FBidToken);
    axios.defaults.headers.common['Authorization'] = FBidToken;
  })
  .then(()=>{
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    return;
  })
}

export const registerAction = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}register`, newUserData)
  .then(res => {
    const FBidToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBidToken', FBidToken)
    axios.defaults.headers.common['Authorization'] = FBidToken;
    dispatch({ type: CLEAR_ERRORS});
    dispatch(getUserData());
    console.log(newUserData);
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
  const result = await axios.post(`${BASE_URL}logout`)
  console.log(result);
  localStorage.removeItem('FBidToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTH})
}