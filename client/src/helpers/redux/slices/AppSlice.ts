import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    FASTLOGINSTEP: 0,
    FASTLOGINMODAL: false,
  },
  reducers: {
    setFastLoginStep: (state, action) => {
      state.FASTLOGINSTEP = action.payload;
    },
    incrementFastLoginStep: (state) => {
      state.FASTLOGINSTEP++;
    },
    resetFastLoginStep: (state) => {
      state.FASTLOGINSTEP = 0;
    },
    toggleFastLoginModal: (state) => {
      state.FASTLOGINMODAL = !state.FASTLOGINMODAL;
    },
  },
});

export const {
  setFastLoginStep,
  incrementFastLoginStep,
  resetFastLoginStep,
  toggleFastLoginModal,
} = AppSlice.actions;

export default AppSlice.reducer;
