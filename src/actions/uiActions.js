import { SET_THEME, SEND_MESSAGE, LOADING_UI,STOP_LOADING_UI } from '../types/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/cdred-project/us-central1/api/';


export const switchTheme = () => (dispatch) => {
    dispatch({ type: SET_THEME });
}


export const sendMessage = (messageData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`${BASE_URL}message`, messageData)
    .then((res) => {
        console.log(res);
        dispatch({ type: STOP_LOADING_UI });
    })
}