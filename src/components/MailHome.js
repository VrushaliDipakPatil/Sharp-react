import React, { useCallback, useEffect, useState } from "react";
import MailCompose from "./MailCompose";
import "./mailhome.css";
import Inbox from "./Inbox";
import Sent from "./Sent";
import AllMails from "./AllMails";
import MailDetail from "./MailDetail";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailslice";
import { useNavigate } from "react-router-dom";


const MailHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCompose, setIsCompose] = useState(false);
  const [isInbox, setIsInbox] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [count, setCount] = useState(0);
  const email = useSelector((state) => state.auth.user_email);


const open = useSelector((state) => state.mail.opendetail)

  const handleCompose = () => {
    setIsCompose(true);
    setIsInbox(false);
    setIsSent(false);
    setIsAll(false);


  };
  const handleInbox = () => {
    setIsInbox(true);
    setIsCompose(false);
    setIsSent(false);
    setIsAll(false);
navigate('/mailhome')
  };
  const handleSent = () => {
    setIsSent(true);
    setIsCompose(false);
    setIsInbox(false);
    setIsAll(false);

  };
  const handleAll = () => {
    setIsAll(true);
    setIsSent(false);
    setIsCompose(false);
    setIsInbox(false);

  };

  const removeSpecialCharacters = (email) => {
    return email.replace(/[@.]/g, "");
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
      let unreadEmailCount = 0;
      for (const key in data) {
        loadedInbox.push({
          id: key,
          From: data[key].From,
          Subject: data[key].Subject,
          Message: data[key].Message,
          To: data[key].To,
          isRead: data[key].isRead,
        });
        if( data[key].isRead == false){
          unreadEmailCount++;
        }
      }
      dispatch(mailActions.InboxData(loadedInbox));
      setCount(unreadEmailCount)
      dispatch(mailActions.UnreadCount(unreadEmailCount))
      

    } catch (error) {}
  }, [dispatch, email]);

  useEffect(()=>{
    fetchInboxMail()
  },[])

  return (
    <>
    <div className="mail-home">
      <div className="label-col">
        <div className="compose-mail" onClick={handleCompose}>
          Compose{" "}
        </div>
        <div className="compose-mail" onClick={handleInbox}>
          {" "}
          Inbox   unread{count}
        </div>
        <div className="compose-mail" onClick={handleSent}>
          {" "}
          sent
        </div>
        <div className="compose-mail" onClick={handleAll}>
          {" "}
          All
        </div>
      </div>
      <div className="show-part">
        {isCompose ? (
          <MailCompose />
        ) : isInbox ? (
          <Inbox />
        ) : isSent ? (
          <Sent />
        ) : isAll ? (
          <AllMails/>
        ) :  null}
      </div>
    </div>
    </>
  );
};

export default MailHome;
