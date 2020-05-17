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

// export const socialUserAction = (provider) => async (dispatch) => {
//   try {
//     const providerResponse = await app.auth().signInWithPopup(provider);
//     console.log("providerResponse", providerResponse);
//     const userCheck = await newSocialUserMap(providerResponse);
//     await saveNewUser(userCheck);
//     const recivedToken = await app.auth().currentUser.getIdToken();
//     setAuthorizationHeader(recivedToken);
//     await dispatch(getUserData());
//     dispatch({ type: CLEAR_ERRORS });
//     toastMsg("Login Succesful!");
//   } catch (error) {
//     console.log("idziemy dluzsza droga", error);
//     console.log(error.code);

//     if (error.code === "auth/account-exists-with-different-credential") {
//       try {
//         const providers = await app
//           .auth()
//           .fetchSignInMethodsForEmail(error.email);
//         console.log("providers", providers);
//         if (providers.includes("password")) {
//           console.log("z passwordem");
//           // open pop and ask the bastard for the password!
//           // await alert('password please', (password) => {
//           //   // user gave me password
//           alert("alert");
//           // });
//           //popup
//           const password = "123456";

//           try {
//             const currentUser = await app
//               .auth()
//               .signInWithEmailAndPassword(error.email, password);

//             try {
//               const user = await app
//                 .auth()
//                 .currentUser.linkWithCredential(error.credential);
//               console.log({ user });
//               const userCheck = await newSocialUserMap(user);
//               await saveNewUser(userCheck);
//               const recivedToken = await app.auth().currentUser.getIdToken();
//               setAuthorizationHeader(recivedToken);
//               await dispatch(getUserData());
//               dispatch({ type: CLEAR_ERRORS });
//               toastMsg("Login Succesful!");
//             } catch (e) {
//               console.log("linkWithCredential", e);
//             }
//           } catch (e) {
//             console.log("signInWithEmailAndPassword Error", e);
//           }
//         } else if (providers === "google.com") {
//           console.log("providers asd");
//           try {
//             console.log("try w sync social i social");
//           } catch (e) {
//             console.log("else", e);
//           }
//         }
//       } catch (e) {
//         console.log({ e });
//         // login refused
//       }
//     }
//   }
// };

export const socialUserAction = (provider) => async (dispatch) => {
  try {
    console.log("jestesmy w 1 try");
    const providerResponse = await app.auth().signInWithPopup(provider);
    console.log(providerResponse);
  } catch (error) {
    console.log("jestesmy w 1 catch");

    if (error.code === "auth/account-exists-with-different-credential") {
      console.log("if");
      var pendingCred = error.credential;
      var email = error.email;
      app
        .auth()
        .fetchSignInMethodsForEmail(email)
        .then(function (methods) {
          if (methods[0] === "password") {
            const password = {};
            app
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(function (user) {
                return user.linkWithCredential(pendingCred);
              })
              .then(function () {});
            return;
          }

          app
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
              result.user
                .linkAndRetrieveDataWithCredential(pendingCred)
                .then(function (usercred) {});
            });
        });
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
