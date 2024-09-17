import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  showPrompt:true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    promptDismiss:(state)=>{
      state.showPrompt=false;
    }
  },
});

export const { login, logout,promptDismiss } = authSlice.actions;
export default authSlice.reducer;
