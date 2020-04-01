import { SET_THEME } from '../types/types';

export const switchTheme = () => (dispatch) => {
    dispatch({ type: SET_THEME });
}