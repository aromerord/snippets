import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import { authReducer } from './reducers/authReducer';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
},
    composeWithDevTools(applyMiddleware(...middleware))
)

