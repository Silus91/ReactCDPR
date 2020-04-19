import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  GET_SURVEYS,
  SEND_SURVEY,
  SHOW_TOAST,
  REMOVE_TOAST
} from '../types/types';

const initialState = {
  loading: false,
  errors: null,
  surveys: [],
  toast: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SURVEYS:
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
    case SHOW_TOAST:
      return Object.assign({}, state, {
        toast: state.toast({
          toast: action.toast,
        }),
      }); 
    case REMOVE_TOAST:
      return initialState.toast; 
    default:
      return state;
  }
}
