import { SET_USER, SET_AUTH, SET_UNAUTH, LOADING_USER } from '../types/types';

const initialState = {
  authenticated: null,
  loading: false,
  credentials: {},
};

export default function (state = initialState, action){
  switch(action.type){
    case SET_AUTH:
      return { ...state, authenticated: true }
    case SET_UNAUTH:
      return { ...state, authenticated: false };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
