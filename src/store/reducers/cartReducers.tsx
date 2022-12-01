import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const cartReducers = createSlice({
    name:"cart",
    initialState:{
        products:[],
        totalPrice:0,
        totalQuantity:0
    },
    reducers:{
        addToCart: (state, action) => {
            const  {product, quantity} = action.payload
            console.log(product.quantity)
            const checkProduct = state.products && state.products.find((pr:any) => pr.id === product.id);
            if(checkProduct) {
                return state;
            } else {
                const tPrice: number = state.totalPrice + (product.discountPrice * quantity);
                const tQuantity: number = state.totalQuantity + quantity;
                const tProduct: any = [...state.products, product];
                const productRef = doc(database,"products", product.id)
                updateDoc(productRef,{quantity: quantity}).then(() => {
                    toast("Product Quantity Update successfully..",{type:"success"});
                }).catch((error) => {
                    console.log(error.message)
                })
                console.log({...state, products: tProduct, totalPrice: tPrice, totalQuantity: tQuantity})
                return {...state, products: tProduct, totalPrice: tPrice, totalQuantity: tQuantity}
            }
        }
    },
    extraReducers:{}
})

export const {addToCart} = cartReducers.actions
export default cartReducers.reducer;