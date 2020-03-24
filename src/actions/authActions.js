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
    // const FBidToken = `Bearer ${res.data.token}`;
    // localStorage.setItem('FBidToken', FBidToken)
    // axios.defaults.headers.common['Authorization'] = FBidToken;
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

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};



//  sprawdzic czy dziala ten krotszy kod i trzeba ta funkcje zkrocic

export const loginFbAction = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const provider = new firebase.auth.FacebookAuthProvider(); 

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
  .then(() => {
    app.auth().onAuthStateChanged((user) => {
      if (!user) {
        return null;
      }
    })
    app.auth().currentUser.getIdToken()
    .then((idToken)=> {
      // const FBidToken = `Bearer ${idToken}`;
      // // console.log("token", FBidToken);
      // // localStorage.setItem('FBidToken', FBidToken);
      // // axios.defaults.headers.common['Authorization'] = FBidToken;
      setAuthorizationHeader(idToken);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
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