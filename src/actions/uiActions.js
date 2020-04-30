import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  GET_SURVEYS,
  SEND_SURVEY,
} from "../types/types";
import axios from "axios";
import { toastMsg } from "../services/Service";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendMessage = (messageData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}message`, messageData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      toastMsg("Message send Succesfuly!");
    })
    .catch((err) => {
      toastMsg("Error please refresh");
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const sendSurvey = (surveyData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}survey`, surveyData)
    .then((res) => {
      dispatch({
        type: SEND_SURVEY,
        payload: res.data.resSurvey,
      });
      dispatch({ type: CLEAR_ERRORS });
      toastMsg("Survey send Succesfuly!");
    })
    .catch((err) => {
      toastMsg("Error please refresh");
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getSurveys = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}getsurveys`)
    .then((res) => {
      dispatch({
        type: GET_SURVEYS,
        payload: res.data,
      });
    })
    .catch((err) => {
      toastMsg("Error please refresh");
      dispatch({
        type: GET_SURVEYS,
        payload: [],
      });
    });
};
