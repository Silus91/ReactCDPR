import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  GET_SURVEYS,
  SEND_SURVEY,
  GET_STOCK,
} from "../types/types";
import axios from "axios";
import { toastMsg } from "../services/Service";
import * as Sentry from "@sentry/browser";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendMessage = (messageData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}/message`, messageData)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      toastMsg("Message send Succesfuly!");
    })
    .catch((err) => {
      toastMsg("Error please refresh");
      Sentry.captureException(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const sendSurvey = (surveyData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${BASE_URL}/survey`, surveyData)
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
      Sentry.captureException(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getSurveys = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}/getsurveys`)
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

export const getStockValue = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const API_CDR = process.env.REACT_APP_STOCK_API_CDR;

  fetch(proxyurl + API_CDR)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const stockValue = res["dataset"]["data"].slice(0, 1000);
      dispatch({
        type: GET_STOCK,
        payload: stockValue,
      });
    })
    .catch((err) => {
      toastMsg("Error please refresh");
      dispatch({
        type: GET_STOCK,
        payload: [],
      });
    });
};
