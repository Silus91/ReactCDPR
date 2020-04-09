import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_THEME,
    SEND_MESSAGE
  } from '../types/types';
  
  const initialState = {
    loading: false,
    errors: null,
    lightTheme:true
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      case SET_THEME:
        return {
          ...state,
          lightTheme: !state.lightTheme
        }
      // case SEND_MESSAGE:
      //   return {
      //     ...state,
          
      //   }
      default:
        return state;
    }
  }
  