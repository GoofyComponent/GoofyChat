import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    JWT_API: null,
    Cookie_MERCURE: null,
    username: null,
    email: null,
    lastname: null,
    firstname: null,
    id: null,
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
    setCookie_MERCURE: (state, action) => {
      state.Cookie_MERCURE = action.payload;
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
  },
});

export const {
  setUserInfos,
  setJWT_API,
  setCookie_MERCURE,
  setUsername,
  setEmail,
  setLastname,
  setFirstname,
  setId,
} = UserSlice.actions;

export default UserSlice.reducer;
