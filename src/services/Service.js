import db from "../resources/Firebase/Firestore";
import axios from "axios";
import M from "materialize-css";
import * as Sentry from "@sentry/browser";

export const toastMsg = (msg) => {
  M.AutoInit();
  M.toast({ html: msg, displayLength: 4000 });
};

export const mapSocialUser = (res) => {
  return {
    firstName: res.user.displayName
      ? res.user.displayName.split(" ")[0]
      : res.user.email,
    lastName: res.user.displayName
      ? res.user.displayName.split(" ")[1]
      : res.user.email,
    email: res.user.email,
    handle: res.user.email,
    createdAt: new Date().toISOString(),
    photoURL: res.user.photoURL,
    userId: res.user.uid,
  };
};

export const firstOrCreate = async (newUser) => {
  try {
    const user = await db.doc(`/users/${newUser.handle}`).get();
    if (user.exists) {
      return newUser;
    }
    try {
      await db.doc(`/users/${newUser.handle}`).set(newUser);
      Sentry.captureMessage(`New User ${newUser.handle}`);
      return newUser;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

export const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem("FBidToken", FBidToken);
  axios.defaults.headers.common["Authorization"] = FBidToken;
};
