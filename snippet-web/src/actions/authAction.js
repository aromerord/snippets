import axios from "axios";
import jwt_decode from 'jwt-decode';
import { LOGIN_ENDPOINT } from "../helpers/endpoints";
import { setTokenAxios } from "../helpers/helpers";
import { setStateAuthReducer } from "../reducers/authReducer";

/**
 * Acción de login para el authReducer
 */
export const loginAction = (user) => dispatch => {

    return new Promise((resolve, reject)=>{
        axios.post(LOGIN_ENDPOINT, user, {
            headers: { 'Accept' : 'application/json', 'ContentType': 'application/json' }
        }).then(response => {

            const { authorization, userId } = response.headers;

            // Se guarda el token en el localStorage
            localStorage.setItem('jwtToken', authorization);

            // Se añade el token a los headers de axios para futuras peticiones
            setTokenAxios(authorization);

            // Se decodifica el token 
            const decoded = jwt_decode(authorization);

            // y se guarda el state del authReducer
            const state = setStateAuthReducer({ user: decoded, login: true })
            dispatch(state);

            resolve(response);
        }).catch(error =>{
            reject(error);
        })
    });
}

/**
 * Acción de logout para el authReducer
 */
export const logoutAction = () => dispatch => {

    // Se elimina el token del localStorage
    localStorage.removeItem("jwtToken");

    // Se elimina el token de los headers de Axios
    setTokenAxios(false);

    // Se elimina el usuario del state
    const state = setStateAuthReducer({ user: {}, login: false })
    dispatch(state);
}