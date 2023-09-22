import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  inboxmail: [],
  sentmail: []
};

const mailSlice = createSlice({
  name: "mails",
  initialState: initialMailState,
  reducers: {
    InboxData(state, action) {
      state.inboxmail = action.payload;
    },

    SentData(state, action) {
        state.sentmail = action.payload;
      },

  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
