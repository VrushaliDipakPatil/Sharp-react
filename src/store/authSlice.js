import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";

const initialAuthState = {
  isAuthenticated: false,
  logindata: [],
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    loginData(state, action) {
      state.logindata = action.payload;
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
