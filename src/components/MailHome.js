import React, { useState } from "react";
import MailCompose from "./MailCompose";
import "./mailhome.css";
import Inbox from "./Inbox";
import Sent from "./Sent";
import AllMails from "./AllMails";
import MailDetail from "./MailDetail";
import { useDispatch, useSelector } from "react-redux";


const MailHome = () => {
  const dispatch = useDispatch()
  const [isCompose, setIsCompose] = useState(false);
  const [isInbox, setIsInbox] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isAll, setIsAll] = useState(false);


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
          Inbox
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
