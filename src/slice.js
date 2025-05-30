import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    message: null
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    showErrorMessage: (state, action) => {
      state.message = { type:"error" , body: action.payload };
    },
    showInfoMessage: (state, action) => {
      state.message = { type:"info" , body: action.payload };
    },
    showWarnMessage: (state, action) => {
      state.message = { type:"warning" , body: action.payload };
    },
    showSuccessMessage: (state, action) => {
      state.message = { type:"success" , body: action.payload };
    },
    clearMessage: (state, action) => {
      state.message = action.payload;
    }
  }
})

export const { setToken, setUser, showErrorMessage, showInfoMessage, showWarnMessage, showSuccessMessage, clearMessage } = appSlice.actions

export default appSlice.reducer