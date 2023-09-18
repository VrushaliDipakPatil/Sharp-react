import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";

const initialExpenseState = {
  expensedata: [],
  isactivatePremium: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    expenseData(state, action) {
      state.expensedata = action.payload;  
    },

    ActivatePremium(state, action){
      state.isactivatePremium = action.payload;
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
