import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailslice";
import "./inbox.css"; // Import the CSS for styling
import { useNavigate } from "react-router-dom";
import useFetchInboxMail from "../CustomHooks/useFetchInboxMail";

const Inbox = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const email = useSelector((state) => state.auth.user_email);



  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };



  const handleSelectMail = (data) => {
    dispatch(mailActions.SelectedMail(data));
navigate('/maildetail')
  };

  const removeSpecialCharacters = (email) => {
    return email.replace(/[@.]/g, "");
  };
  const emailId = removeSpecialCharacters(email);
  const { inboxMail, error } = useFetchInboxMail(emailId);

  const deleteMailHandler = async (mailId) => {
    const emailId = removeSpecialCharacters(email);
    try {
      const response = await fetch(
        `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${emailId}/${mailId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }
      
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };


  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Inbox</h1>
        {inboxMail !== null && inboxMail !== undefined ? (
          inboxMail.map((data) => (
            <div
              className="email-item"
              key={data.id}
              
            >
              <div className="email-details">
                <div onClick={() => handleSelectMail(data)} style={{display:'flex'}}>
                <div
                  className={
                    data.isRead == false ? "circle-unread" : "circle-read"
                  }
                ></div>
                <p className="email">{data.From}</p>
                <h5 className="email">{data.Subject}</h5>
                <div
                  className="email"
                  dangerouslySetInnerHTML={renderHTML(data.Message)}
                ></div>
                </div>
                <button className="email" onClick={()=>deleteMailHandler(data.id)}>Delete</button>
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
