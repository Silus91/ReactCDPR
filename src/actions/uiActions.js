import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS, GET_SURVEYS, SEND_SURVEY  } from '../types/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';

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
    console.log(res)
    dispatch({
      type: SEND_SURVEY,
      payload: res.data.resSurvey
    });
    dispatch({ type: CLEAR_ERRORS });
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })
}

export const getSurveys = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.get(`${BASE_URL}getsurveys`)
    .then((res) => {
      dispatch({
        type: GET_SURVEYS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_SURVEYS,
        payload: []
      });
    });
};
