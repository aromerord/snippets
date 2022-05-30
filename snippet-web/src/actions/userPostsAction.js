import axios from "axios";
import { POSTS_BY_USER } from "../constants/endpoints";
import { setStateUserPostsReducer } from "../reducers/userPostsReducer";

/**
 * Acción del userPostsReducer para obtener los posts de un usuario
 */
export const userPostsAction = () => dispatch => {

    return new Promise((resolve, reject) => {
        axios.get(POSTS_BY_USER).then(response => {

            // Se crea el state para el userPostsReducer y se envía para su actualización
            const state = setStateUserPostsReducer({ posts: response.data, fetched: true })
            dispatch(state);

            resolve(response);
        }).catch(error => {
            reject(error);
        })
    })
}