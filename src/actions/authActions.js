import { 
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTH,
  LOADING_UI,
} from '../types/types';
import axios from 'axios';
import app from '../resources/Firebase/Firebase';
import {newSocialUserMap, saveNewUser, setAuthorizationHeader } from '../services/Service';
import { toastMsg } from '../services/Service'

const firebase = require('firebase');
const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginAction = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}login`, userData)
  .then((res) => {
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    toastMsg('Login Succesful!');
  })
  .catch(err => {
    toastMsg('Error please try Again')
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    
    })
  })
}

export const socialUserAction = (provider) => async (dispatch) => {
  try{
    const providerResponse = await app.auth().signInWithPopup(provider);
    const userCheck = await newSocialUserMap(providerResponse);
    await saveNewUser(userCheck);
    const recivedToken = await app.auth().currentUser.getIdToken();
    setAuthorizationHeader(recivedToken);
    await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    toastMsg('Login Succesful!')
  } catch (error) {
    toastMsg('Error please try Again')
      dispatch({
        type: SET_ERRORS,
        payload: error.response
      })
    }
}

export const loginFbAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.FacebookAuthProvider(); 
  dispatch(socialUserAction(provider));
}

export const loginGoogleAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.GoogleAuthProvider(); 
  dispatch(socialUserAction(provider));
}

export const registerAction = (newUserData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}register`, newUserData)
  .then(res => {
    setAuthorizationHeader(res.data.token);
    dispatch({ type: CLEAR_ERRORS });
    dispatch(getUserData());
    toastMsg('Register Succesful!')
  })
  .catch(err => {
    toastMsg('Error please try Again')
    dispatch({
      type: SET_ERRORS,
      payload: err.res.data
    })
  })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`${BASE_URL}user`).then((res) => {
    dispatch({
      type: SET_USER,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch((err) => console.log(err));
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios.post(`${BASE_URL}logout`);
  localStorage.removeItem('FBidToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTH});
  dispatch({ type: CLEAR_ERRORS });
  toastMsg('Logout Succesful!');
  toastMsg('Please Comeback one day!');
}

export const uploadUserImg = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}user/image`, formData)
    .then(() => {
      dispatch(getUserData());
      toastMsg('Profile Image Updated!');
    })
    .catch((err) =>{
      console.log(err.res.data)
      toastMsg('Only jpeg/png');
      dispatch({
        type: SET_ERRORS,
        payload: err.res.data
      })
    });
};

