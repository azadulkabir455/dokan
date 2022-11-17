import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import userReducers from './reducers/userReducers'

const store = configureStore({
    reducer: {
        users: userReducers
    },
    middleware: [...getDefaultMiddleware()]
})

export default store;


