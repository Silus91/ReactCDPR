import { 
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTH,
  LOADING_UI,
  LOADING_USER
} from '../types/types';
import axios from 'axios';

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

export const loginFbAction = (history) => (dispatch) => {
  console.log("actions")
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}fblogin`)
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
  console.log("kurwa nacisnolem")
  const result = await axios.post(`${BASE_URL}logout`)
  console.log(result);
  localStorage.removeItem('FBidToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTH})
}