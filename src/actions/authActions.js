import { 
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTH,
  LOADING_UI,
  LOADING_USER,
} from '../types/types';
import axios from 'axios';
import app from '../resources/Firebase/Firebase';
import {newSocialUserMap, saveNewUser, setAuthorizationHeader } from '../services/Service';

const firebase = require('firebase');
const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

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
      payload: err.response
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
  } catch (error) {
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
      payload: err.response
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
