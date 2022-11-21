import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import postReducers from "./reducers/postReducers";
import userReducers from './reducers/userReducers'

const store = configureStore({
    reducer: {
        users: userReducers,
        posts: postReducers
    },
    middleware: [...getDefaultMiddleware()]
})

export default store;


