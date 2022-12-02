import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const cartReducers = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalPrice: 0,
        totalQuantity: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload
            console.log(product.quantity)
            const checkProduct = state.products && state.products.find((pr: any) => pr.id === product.id);
            if (checkProduct) {
                return state;
            } else {
                const tPrice: number = state.totalPrice + (product.discountPrice * quantity);
                const tQuantity: number = state.totalQuantity + quantity;
                const tProduct: any = [...state.products, product];
                const productRef = doc(database, "products", product.id)
                updateDoc(productRef, { quantity: quantity }).then(() => {
                    toast("Product Quantity Update successfully..", { type: "success" });
                }).catch((error) => {
                    console.log(error.message)
                })
                return { ...state, products: tProduct, totalPrice: tPrice, totalQuantity: tQuantity }
            }
        },
        inc: (state, action) => {
            const {id, quantity} = action.payload
            const productRef = doc(database, "products", action.payload)
            updateDoc(productRef, {quantity: quantity + 1}).then(() => [
                console.log("Product Quantity update successfully")
            ]).catch((error) => {
                console.log(error.message)
            })
            // return {...state, totalPrice: state.totalPrice + findPro.discountPrice, totalQuantity: state.totalQuantity + 1 }

        },
        dec: (state, action) => {
            console.log(action.payload)
        },
        remove: (state, action) => {

        }

    },
    extraReducers: {}
})

export const { addToCart, inc, dec, remove } = cartReducers.actions
export default cartReducers.reducer;