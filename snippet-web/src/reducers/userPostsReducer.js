import { SET_USER_POSTS } from "../constants/types";

const initialState = {posts: [], fetched: false}

/**
 * Reducer para guardar los posts de un usuario
 */
export const userPostsReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_USER_POSTS:
            return {
                ...state,
                fetched: payload.fetched,
                posts: payload.posts
            }
        default:
            return state;
    }
}

/**
 * Crea el state del userPostsReducer
 */
 export const setStateUserPostsReducer = ({posts, fetched}) => {
    let state = {
        type: SET_USER_POSTS,
        payload: {posts, fetched}
    }
    return state;
}