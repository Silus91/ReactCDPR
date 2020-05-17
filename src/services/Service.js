import db from "../resources/Firebase/Firestore";
import axios from "axios";
import M from "materialize-css";
import * as Sentry from "@sentry/browser";
import app from "../resources/Firebase/Firebase";

export const toastMsg = (msg) => {
  M.AutoInit();
  M.toast({ html: msg, displayLength: 4000 });
};

export const newSocialUserMap = (res) => {
  const newUser = {
    firstName: res.user.displayName.split(" ")[0],
    lastName: res.user.displayName.split(" ")[1],
    email: res.user.email,
    handle: res.user.email,
    createdAt: new Date().toISOString(),
    photoURL: res.user.photoURL,
    userId: res.user.uid,
  };
  return newUser;
};

export const linkWithPopup = (provider) => {
  app.auth.currentUser
    .linkWithPopup(provider)
    .then(function (result) {
      console.log("jestem");

      var credential = result.credential;
      var user = result.user;
      console.log(user, credential);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const saveNewUser = async (newUser) => {
  try {
    const user = await db.doc(`/users/${newUser.handle}`).get();
    if (user.exists) {
      return newUser;
    } else {
      try {
        await db.doc(`/users/${newUser.handle}`).set(newUser);
        return newUser;
      } catch (error) {
        Sentry.captureException("1social save user", error);
      }
    }
  } catch (error) {
    Sentry.captureException("2social save user", error);
    console.error(error);
  }
};

export const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem("FBidToken", FBidToken);
  axios.defaults.headers.common["Authorization"] = FBidToken;
};
