import React, { useState } from "react";
import MailCompose from "./MailCompose";
import "./mailhome.css";
import Inbox from "./Inbox";
import Sent from "./Sent";
import AllMails from "./AllMails";
import { useDispatch, useSelector } from "react-redux";
import "./maildetail.css";
import { mailActions } from "../store/mailslice";
import { useNavigate } from "react-router-dom";

const MailDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isCompose, setIsCompose] = useState(false);
  const [isInbox, setIsInbox] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const selectedmail = useSelector((state) => state.mail.selectedmail);
  const count = useSelector((state)=> state.mail.unreadcount)

  dispatch(mailActions.InboxData(''))

  const handleCompose = () => {
    setIsCompose(true);
    setIsInbox(false);
    setIsSent(false);
    setIsAll(false);
    navigate('/mailhome')
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
    navigate('/mailhome')
  };
  const handleAll = () => {
    setIsAll(true);
    setIsSent(false);
    setIsCompose(false);
    setIsInbox(false);
    navigate('/mailhome')
  };

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
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
            Inbox   unread {count}
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
            <AllMails />
          ) : (
            <>
              <div className="mail-detail">
                <div className="from-mail">
                <b>{selectedmail[0]?.From} </b>
                </div>
                <div className="subject">
                <b>Subject :{selectedmail[0]?.Subject} </b>
                </div>
                <div className="message" dangerouslySetInnerHTML={renderHTML(selectedmail[0]?.Message)}></div>
              </div>
              <div style={{color: 'blue', marginTop: '30px'}}>Reply, Reply All or Forward</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MailDetail;