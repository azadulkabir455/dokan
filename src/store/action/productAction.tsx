import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";


const getProducts:any = createAsyncThunk("products", async () => {
    const productRef = collection(database,"products");
    const productsDataRes = await getDocs(productRef);
    const produtsData = productsDataRes.docs.map((doc:any) => ({...doc.data(), id: doc.id}));
    return produtsData;
})

export { getProducts }