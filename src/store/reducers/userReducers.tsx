import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUsers } from "../action/userAction";

const userReducers = createSlice({
  name: "users",
  initialState: {
    users: [{ name: "akash" }, { name: "azad" }],
    user: [{name:"akash"}],
    error: {},
    loader: false,

  },
  reducers: {},
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
    },

    [getUser.pending]: (state, action) => {
      state.loader = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loader = false;
      state.user = action.payload;
    },
    [getUser.error]: (state, action) => {
      state.loader = false;
      state.error = action.payload;
    }
  }
})

export default userReducers.reducer