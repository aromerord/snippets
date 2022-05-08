import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { logoutAction } from '../actions/authAction';
import { setStateAuthReducer } from '../reducers/authReducer';
import { store } from '../store';

/**
 * Añade el token a los headers de axios
 * @param {*} token 
 */
export const setTokenAxios = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

/**
 * Comprueba el token del localStorage al recargar la web
 */
export const checkForToken = () => {
    if (localStorage.jwtToken) {

        // Se añade el token a los headers de axios para futuras peticiones
        setTokenAxios(localStorage.jwtToken);

        // Se decodifica el token 
        const decoded = jwt_decode(localStorage.jwtToken);  

        // y se guarda en el store
        const state = setStateAuthReducer({ user: decoded, login: true })
        store.dispatch(state);

        // Se comprueba la fecha de expiración y si ha pasado, se elimina el token del localStorage
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            store.dispatch(logoutAction());
            window.location.href = '/login';
        }

    }
}

/**
 * Comprueba si un objeto está vacío
 */
export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

