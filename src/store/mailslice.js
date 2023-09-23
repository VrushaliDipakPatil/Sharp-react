import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const removeSpecialCharacters = (email) => {
  return email.replace(/[@.]/g, "");
};

const initialMailState = {
  inboxmail: [],
  sentmail: [],
  selectedmail: [],
  unreadcount: 0
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

    SelectedMail(state, action) {
      const selectedMailIds = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const userEmail = removeSpecialCharacters(action.payload.To);
      try {
        const response = fetch(
          `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${userEmail}/${action.payload.id}.json`,
          {
            method: "PUT", // Use PATCH for partial updates
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              From: action.payload.From,
              To: action.payload.To,
              Subject: action.payload.Subject,
              Message: action.payload.Message,
              isRead: true,
            }),
          }
        );

      } catch (error) {
        console.error("Error updating read:", error);
      }

      state.selectedmail = selectedMailIds;
    },

    UnreadCount(state, action){
      state.unreadcount = action.payload
    }

  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
