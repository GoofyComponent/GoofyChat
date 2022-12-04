import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    JWT_API: null,
    JWT_Mercure: null,
    username: null,
    email: null,
    lastname: null,
    firstname: null,
    id: null,
    mercureListener: null,
  },
  reducers: {
    setUserInfos: (state, action) => {
      console.log("setUserInfos", action.payload);
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.lastname = action.payload.lastname;
      state.firstname = action.payload.firstname;
    },
    setJWT_API: (state, action) => {
      state.JWT_API = action.payload;
    },
    setJWT_Mercure: (state, action) => {
      state.JWT_Mercure = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setMercureListener: (state, action) => {
      state.mercureListener = action.payload;
    },
    resetUser: (state) => {
      state.JWT_API = null;
      state.JWT_Mercure = null;
      state.username = null;
      state.email = null;
      state.lastname = null;
      state.firstname = null;
      state.id = null;
    },
    eraseAllUser: (state) => {
      state.JWT_API = null;
      state.JWT_Mercure = null;
      state.username = null;
      state.email = null;
      state.lastname = null;
      state.firstname = null;
      state.id = null;
      state.mercureListener = null;
    },
  },
});

export const {
  setUserInfos,
  setJWT_API,
  setJWT_Mercure,
  setUsername,
  setEmail,
  setLastname,
  setFirstname,
  setId,
  setMercureListener,
  resetUser,
  eraseAllUser,
} = UserSlice.actions;

export default UserSlice.reducer;
