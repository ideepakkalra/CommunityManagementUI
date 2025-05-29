import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    token: null,
    user: null,
    message: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
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