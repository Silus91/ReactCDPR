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
const fbAuth = app.auth();

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

export const tryLoginUser = () => async (dispatch) => {
  try {
    const recivedToken = await fbAuth.currentUser.getIdToken();
    setAuthorizationHeader(recivedToken);
    await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    toastMsg("Login Succesful!");
  } catch (error) {
    toastMsg("Error please try Again");
  }
};

export const socialUserAction = (provider) => async (dispatch) => {
  try {
    const providerResponse = await fbAuth.signInWithPopup(provider);
    const userCheck = await newSocialUserMap(providerResponse);
    await saveNewUser(userCheck);
    dispatch(tryLoginUser());
  } catch (error) {
    const catchError = error;
    if (catchError.code === "auth/account-exists-with-different-credential") {
      try {
        const providers = await fbAuth.fetchSignInMethodsForEmail(
          catchError.email
        );
        if (providers.includes("password")) {
          const password = window.prompt(
            `You do have account already with ${catchError.email}, please provide your password to synchronize accounts as one, or close this window and use normal login.`
          );
          try {
            await fbAuth.signInWithEmailAndPassword(catchError.email, password);
            try {
              const emailLinking = await fbAuth.currentUser.linkWithCredential(
                catchError.credential
              );
              dispatch(tryLoginUser());
            } catch (e) {
              Sentry.captureException(
                "Trying to sync accounts email with social",
                e
              );
              console.error(e);
            }
          } catch (e) {
            console.error(e);
          }
        } else if (catchError.credential.providerId) {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const providerResponse = await fbAuth.signInWithPopup(provider);
            try {
              const tryLinkWithCred = await fbAuth.currentUser.linkWithCredential(
                catchError.credential
              );
              const trySignWithCred = fbAuth.signInWithCredential(
                tryLinkWithCred.credential
              );
              dispatch(tryLoginUser());
            } catch (e) {
              console.error(e);
            }
          } catch (e) {
            console.error(e);
          }
        }
      } catch (e) {
        console.error(e);
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
