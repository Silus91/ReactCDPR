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
  mapSocialUser,
  firstOrCreate,
  setAuthorizationHeader,
} from "../services/Service";
import { toastMsg } from "../services/Service";
import * as Sentry from "@sentry/browser";

const firebase = require("firebase");
const fbAuth = app.auth();
const BASE_URL = process.env.REACT_APP_BASE_URL;

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

const handlePasswordBasedAccountLinking = (catchError) => async (dispatch) => {
  try {
    const password = window.prompt(
      `You do have account already with ${catchError.email}, please provide your password to synchronize accounts as one, or close this window and use email login.`
    );
    await fbAuth.signInWithEmailAndPassword(catchError.email, password);
    await fbAuth.currentUser.linkWithCredential(catchError.credential);
    dispatch(tryLoginUser());
  } catch (e) {
    toastMsg("Use Email/Password Login Instead");
    dispatch({ type: SET_ERRORS, payload: e });
    Sentry.captureException("Trying to sync accounts email with social", e);
    console.error(e);
    throw e;
  }
};

const handleSocialAccountLinking = (catchError) => async (dispatch) => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await fbAuth.signInWithPopup(provider);
    const tryLinkWithCred = await fbAuth.currentUser.linkWithCredential(
      catchError.credential
    );
    await fbAuth.signInWithCredential(tryLinkWithCred.credential);
    dispatch(tryLoginUser());
  } catch (e) {
    dispatch({ type: SET_ERRORS, payload: e });
    toastMsg("Error please referesh");
  }
};

export const socialUserAction = (provider) => async (dispatch) => {
  try {
    const providerResponse = await fbAuth.signInWithPopup(provider);
    const user = await mapSocialUser(providerResponse);
    console.log("response", providerResponse);
    await firstOrCreate(user);
    dispatch(tryLoginUser());
  } catch (catchError) {
    const isAlreadyInUse =
      catchError.code === "auth/account-exists-with-different-credential";
    if (isAlreadyInUse) {
      try {
        const providers = await fbAuth.fetchSignInMethodsForEmail(
          catchError.email
        );
        if (providers.includes("password")) {
          try {
            dispatch(handlePasswordBasedAccountLinking(catchError));
          } catch (e) {
            dispatch({ type: SET_ERRORS, payload: e });
          }
        } else if (catchError.credential.providerId) {
          try {
            dispatch(handleSocialAccountLinking(catchError));
          } catch (e) {
            dispatch({ type: SET_ERRORS, payload: e });
            Sentry.captureException("Social with social", e);
          }
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: SET_ERRORS, payload: e });
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
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
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
