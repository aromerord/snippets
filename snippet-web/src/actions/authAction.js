import axios from "axios";
import jwt_decode from 'jwt-decode';
import { LOGIN, USERS } from "../constants/endpoints";
import { setTokenAxios } from "../helpers/helpers";
import { setStateAuthReducer } from "../reducers/authReducer";
import { setStateUserPostsReducer } from "../reducers/userPostsReducer";

/**
 * Acción de login para el authReducer
 */
export const loginAction = (user) => dispatch => {

    return new Promise((resolve, reject)=>{
        axios.post(LOGIN, user, {
            headers: { 'Accept' : 'application/json', 'ContentType': 'application/json' }
        }).then(response => {

            const { authorization } = response.headers;

            // Se guarda el token en el localStorage
            localStorage.setItem('jwtToken', authorization);

            // Se añade el token a los headers de axios para futuras peticiones
            setTokenAxios(authorization);

            // Se decodifica el token 
            const decoded = jwt_decode(authorization);

            // se crea el state para el authReducer y se envía para su actualización
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
    const stateAuth = setStateAuthReducer({ user: {}, login: false })
    dispatch(stateAuth);

    // Se eliminan los posts del state
    const statePosts = setStateUserPostsReducer({ posts: {}, fetched: false })
    dispatch(statePosts);
}

/**
 * Acción de registro para el authReducer
 */
 export const registerAction = (user) => dispatch => {

    return new Promise((resolve, reject)=>{
        axios.post(USERS, user, {
            headers: { 'Accept' : 'application/json', 'ContentType': 'application/json' }
        }).then(response => {

            resolve(response);
            
        }).catch(error =>{
            reject(error);
        })
    });
}