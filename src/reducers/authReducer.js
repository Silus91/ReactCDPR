import { SET_USER, SET_UNAUTH } from "../types/types";

const initialState = {
  authenticated: null,
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_UNAUTH:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
