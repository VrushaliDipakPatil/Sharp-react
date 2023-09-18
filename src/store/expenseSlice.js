import { createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";

const initialExpenseState = {
  expensedata: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    expenseData(state, action) {
      state.expensedata = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
