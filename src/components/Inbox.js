import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailslice";
import "./inbox.css"; // Import the CSS for styling
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const email = useSelector((state) => state.auth.user_email);
  const inbox = useSelector((state) => state.mail.inboxmail);

  const removeSpecialCharacters = (email) => {
    return email.replace(/[@.]/g, "");
  };

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  const fetchInboxMail = useCallback(async () => {
    const emailId = removeSpecialCharacters(email);
    try {
      const response = await fetch(
        `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${emailId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong.....Retrying!");
      }
      const data = await response.json();
      const loadedInbox = [];
      for (const key in data) {
        loadedInbox.push({
          id: key,
          From: data[key].From,
          Subject: data[key].Subject,
          Message: data[key].Message,
          To: data[key].To,
          isRead: data[key].isRead,
        });
      }
      dispatch(mailActions.InboxData(loadedInbox));
    } catch (error) {}
  }, [dispatch, email]);

  useEffect(() => {
    fetchInboxMail();
  }, [fetchInboxMail]);

  const handleSelectMail = (data) => {
    dispatch(mailActions.SelectedMail(data));
navigate('/maildetail')
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Inbox</h1>
        {inbox !== null ? (
          inbox.map((data) => (
            <div
              className="email-item"
              key={data.id}
              onClick={() => handleSelectMail(data)}
            >
              <div className="email-details">
                <div
                  className={
                    data.isRead == "false" ? "circle-unread" : "circle-read"
                  }
                ></div>
                <p className="email">{data.From}</p>
                <h5 className="email">{data.Subject}</h5>
                <div
                  className="email"
                  dangerouslySetInnerHTML={renderHTML(data.Message)}
                ></div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No mails found</p>
        )}
      </div>
    </>
  );
};

export default Inbox;
