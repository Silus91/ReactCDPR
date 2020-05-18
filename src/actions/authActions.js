import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTH,
  LOADING_UI,
} from "../types/types";
import axios from "axios";
import app from "../resources/Firebase/Firebase";
import {
  newSocialUserMap,
  saveNewUser,
  setAuthorizationHeader,
} from "../services/Service";
import { toastMsg } from "../services/Service";
import * as Sentry from "@sentry/browser";

const firebase = require("firebase");

const BASE_URL = process.env.REACT_APP_LOCAL;

export const loginAction = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}/login`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      toastMsg("Login Succesful!");
    })
    .catch((err) => {
      toastMsg("Error please try Again");
      Sentry.captureException(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const succesWorker = (providerResponse) => async (dispatch) => {
  const userCheck = await newSocialUserMap(providerResponse);
  await saveNewUser(userCheck);
  const recivedToken = await app.auth().currentUser.getIdToken();
  setAuthorizationHeader(recivedToken);
  await dispatch(getUserData());
  dispatch({ type: CLEAR_ERRORS });
  toastMsg("Login Succesful!");
};

export const socialUserAction = (provider) => async (dispatch) => {
  try {
    const providerResponse = await app.auth().signInWithPopup(provider);
    console.log("providerResponse", providerResponse);
    dispatch(succesWorker(providerResponse));
  } catch (error) {
    const catchError = error;

    if (catchError.code === "auth/account-exists-with-different-credential") {
      try {
        const providers = await app
          .auth()
          .fetchSignInMethodsForEmail(catchError.email);
        console.log("providers", providers);
        if (providers.includes("password")) {
          const password = window.prompt(
            `Please provide the password for ${catchError.email}`
          );
          try {
            const trySignIn = await app
              .auth()
              .signInWithEmailAndPassword(catchError.email, password);
            console.log("trySignIn");
            try {
              console.log("wazny conosole");
              const user = await app
                .auth()
                .currentUser.linkWithCredential(catchError.credential);
              console.log({ user });
              console.log("mamy to kurwa");
            } catch (e) {
              console.log("hujowy password", e);
            }
          } catch (e) {
            console.log("signInWithEmailAndPassword Error", e);
          }
        } else if (catchError.credential.providerId) {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const trySign = await app.auth().signInWithPopup(provider);

            console.log("w 1 try", trySign);
            try {
              console.log("w 2 try");
              const tryLink = await app
                .auth()
                .currentUser.linkWithCredential(catchError.credential);
              console.log("trylink", tryLink);
              const providerResponse = app
                .auth()
                .signInWithCredential(tryLink.credential);
              const recivedToken = await app.auth().currentUser.getIdToken();
              setAuthorizationHeader(recivedToken);
              await dispatch(getUserData());
              dispatch({ type: CLEAR_ERRORS });
              toastMsg("Login Succesful!");
            } catch (e) {
              console.log("piersze zjebanie", e);
              // tutaj;
            }
          } catch (e) {
            console.log("drugie zjebanie", e);
          }
        }
      } catch (e) {
        console.log("huj wie", e);
      }
    }
  }
};

export const loginFbAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(socialUserAction(provider));
};

export const loginGoogleAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.GoogleAuthProvider();
  dispatch(socialUserAction(provider));
};

export const registerAction = (newUserData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}/register`, newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getUserData());
      toastMsg("Register Succesful!");
    })
    .catch((err) => {
      toastMsg("Error please try Again");
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}/user`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios.post(`${BASE_URL}/logout`);
  localStorage.removeItem("FBidToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTH });
  dispatch({ type: CLEAR_ERRORS });
  toastMsg("Logout Succesful!");
  toastMsg("Please Comeback one day!");
};

export const uploadUserImg = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}/user/image`, formData)
    .then(() => {
      dispatch(getUserData());
      toastMsg("Profile Image Updated!");
    })
    .catch((err) => {
      toastMsg("Error please try again later or Contact Us");
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
