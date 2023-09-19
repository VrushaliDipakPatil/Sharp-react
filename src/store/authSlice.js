import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";

const initialAuthState = {
  isAuthenticated: false,
  logindata: [],
  user_email: '',
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
    UserEmail(state, action){
      state.user_email = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
