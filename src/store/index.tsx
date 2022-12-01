import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import cartReducers from "./reducers/cartReducers";
import postReducers from "./reducers/postReducers";
import productReducers from "./reducers/productReducers";
import userReducers from './reducers/userReducers'

const store = configureStore({
    reducer: {
        users: userReducers,
        posts: postReducers,
        products: productReducers,
        cart: cartReducers
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export default store;


