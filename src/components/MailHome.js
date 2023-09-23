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
import useFetchInboxMail from "../CustomHooks/useFetchInboxMail";


const MailHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCompose, setIsCompose] = useState(false);
  const [isInbox, setIsInbox] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [isAll, setIsAll] = useState(false);
  
  const email = useSelector((state) => state.auth.user_email);
  const count = useSelector((state)=> state.mail.unreadcount)
  const removeSpecialCharacters = (email) => {
    return email.replace(/[@.]/g, "");
  };
  const emailId = removeSpecialCharacters(email);
  const { inboxMail, error } = useFetchInboxMail(emailId);


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
