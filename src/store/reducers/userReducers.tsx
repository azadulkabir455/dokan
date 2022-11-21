import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../action/userAction";

const userReducers = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    error: {},
    loader: false,
    
  },
  reducers: {
    // getUser:(state,action) => {
    //   const userData = state.users.filter((user:any) => user.id === action.payload);
    //   console.log(action.payload)
    //   state.user = {...state.user, userData}
    // }
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loader = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loader = false;
      state.users = action.payload;
    },
    [getUsers.error]: (state, action) => {
      state.loader = false;
      state.error = action.payload;
    }
  }
})

// export const {getUser} = userReducers.actions;
export default userReducers.reducer