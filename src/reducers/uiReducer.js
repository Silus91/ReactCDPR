import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_SURVEYS,
  POST_SURVEY,
  SEND_SURVEY
} from '../types/types';

const initialState = {
  loading: false,
  errors: null,
  surveys: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SURVEYS:
      return {
        ...state,
        surveys: action.payload,
        loading: false
      };
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
        loading: true,
        errors: null
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
      case SEND_SURVEY:
        return {
          ...state,
          surveys: [action.payload, ...state.surveys]
        };
    default:
      return state;
  }
}
