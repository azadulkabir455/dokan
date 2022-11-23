import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { getProducts } from "../action/productAction";


const productReducers = createSlice({
    name: "products",
    initialState: {
        products:[],
        product:{},
        error:{},
        loading: false
    },
    reducers: {
        addProduct: (state, action) => {
            const productRef = collection(database, "products");
            addDoc(productRef, action.payload).then(() => {
                console.log("product Upload succefully")
            }).catch((error) => {
                console.log(error.message);
            })
        }
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.loading = false;
        },
        [getProducts.error]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {addProduct} = productReducers.actions;
export default productReducers.reducer;