import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { userPostsReducer } from './reducers/userPostsReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
    auth: authReducer,
    userPosts: userPostsReducer
  });

export const store = configureStore({
    reducer: rootReducer
},
    composeWithDevTools(applyMiddleware(...middleware))
)

