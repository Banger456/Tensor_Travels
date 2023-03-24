import { createSlice } from "@reduxjs/toolkit";

  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
    const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
        registerSuccess: (state) => {
          state.isLoggedIn = false;
        },
        registerFail: (state) => {
          state.isLoggedIn = false;
        },
        loginSuccess: (state, action) => {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        },
        loginFail: (state) => {
          state.isLoggedIn = false;
          state.user = null;
        },
        logout: (state) => {
          state.isLoggedIn = false;
          state.user = null;
        },
      },
    });
    
    export const {
      registerSuccess,
      registerFail,
      loginSuccess,
      loginFail,
      logout,
    } = authSlice.actions;
    
    export default authSlice.reducer;