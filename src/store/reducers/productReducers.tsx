import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getProducts } from "../action/productAction";


const productReducers = createSlice({
    name: "products",
    initialState: {
        products: [],
        productsContainer:[],
        product: {},
        error: {},
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
        },
        editProduct: (state, action) => {
            const productRef = doc(database, "products", action.payload.id);
            updateDoc(productRef, action.payload).then(() => {
                console.log("Product update successfully");
            }).catch((error) => {
                console.log(error.message)
            })
        },
        deleteProduct: (state, action) => {
            const productRef = doc(database, "products", action.payload);
            deleteDoc(productRef).then(() => {
                console.log("Delete Data successfully")
            }).catch((error) => {
                console.log(error.message)
            })
        },
        getSingleProduct: (state, action) => {
            state.product = state.products.filter((product: any) => product.id === action.payload)[0]
        },
        searchPro:(state, action) => {
            state.products = state.productsContainer.filter((pro:any)=> pro.name.toLowerCase().includes(action.payload))
        },
        filterPro: (state, action) => {
            const checkList = action.payload.filter((item: any) => item.checked).map((item: any) => item.label.toLowerCase());
            if(checkList.length) {
                state.products = state.productsContainer.filter((item:any) => checkList.includes(item.productType))
            }else {
                state.products = state.productsContainer;
            }
        }
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.productsContainer = action.payload;
            state.loading = false;
        },
        [getProducts.error]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { addProduct, editProduct, deleteProduct, getSingleProduct, filterPro,searchPro } = productReducers.actions;
export default productReducers.reducer;