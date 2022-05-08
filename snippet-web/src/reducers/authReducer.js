import { SET_CURRENT_USER } from '../constants/types';

const initialState = {login: false, user: {}}

/**
 * Reducer para gestionar las sesiones de un usuario. 
 * Cuenta con dos acciones (loginAction y logoutAction)
 */
export const authReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                login: payload.login,
                user: payload.user
            }
        default:
            return state;
    }
}

/**
 * Devuelve un objeto con el state del authReducer
 */
export const setStateAuthReducer = ({user, login}) => {
    let state = {
        type: SET_CURRENT_USER,
        payload: {user, login}
    }
    return state;
}