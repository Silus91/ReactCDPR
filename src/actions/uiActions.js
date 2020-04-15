import { SET_THEME,SET_ERRORS, SEND_MESSAGE, LOADING_UI,STOP_LOADING_UI, CLEAR_ERRORS, SEND_SURVEY } from '../types/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';


export const switchTheme = () => (dispatch) => {
    dispatch({ type: SET_THEME });
}

export const sendMessage = (messageData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}message`, messageData)
  .then((res) => {
    console.log("res.data", res.data);
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
}

export const sendSurvey = (surveyData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post(`${BASE_URL}survey`, surveyData)
  .then((res) => {
      console.log("res.data", res.data);
      dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
}