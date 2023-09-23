import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailslice';
import { useNavigate } from 'react-router-dom';
import './inbox.css'

const Sent = () => {
const dispatch = useDispatch()
    const [Sent, setIsSent] = useState(null)
const navigate = useNavigate()
    const email = useSelector((state) => state.auth.user_email)
    const removeSpecialCharacters = (email) => {
        return email.replace(/[@.]/g, '');
      };


    const fetchSentMail = useCallback(async () => {
        const emailId = removeSpecialCharacters(email);
        try {
          const response = await fetch(
            `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/sent/${emailId}.json`
          );
          if (!response.ok) {
            throw new Error("Something went wrong.....Retrying!");
          }
          const data = await response.json();
          const loadedSent = [];
          for (const key in data) {
            loadedSent.push({
              id: key,
              From: data[key].From,
              Subject: data[key].Subject,
              Message: data[key].Message,
              To: data[key].To
            });
          }
          setIsSent(loadedSent)
          dispatch(mailActions.SentData(loadedSent))
        } catch (error) {}
      }, []);

      useEffect(()=>{
        fetchSentMail()
      },[])

      const renderHTML = (htmlString) => {
        return { __html: htmlString };
      };

      const handleSelectMail = (data) => {
        dispatch(mailActions.SelectedMail(data));
    navigate('/maildetail')
      };

  return (
    <>
{/* <div className="container mt-5">
  <h1 className="mb-4">Sent</h1>
  {Sent !== null ? (
    Sent.map((data) => (
      <div className="card" key={data.id}>
        <div className="card-body">
          <h6 className="card-text">To: {data.To}</h6>
          <h5 className="card-title">{data.Subject}</h5>
          <p className="card-text" dangerouslySetInnerHTML={renderHTML(data.Message)}></p>
          <a href="#" className="btn btn-primary">
            Read Email
          </a>
        </div>
      </div>
    ))
  ) : (
    <p>No mails found</p>
  )}
</div> */}

<div className="container mt-5">
        <h1 className="mb-4">Sent</h1>
        {Sent !== null && Sent !== undefined ? (
          Sent.map((data) => (
            <div
              className="email-item"
              key={data.id}
              
            >
              <div className="email-details">
                <div onClick={() => handleSelectMail(data)} style={{display:'flex'}}>
                <p className="email">{data.To}</p>
                <h5 className="email">{data.Subject}</h5>
                <div
                  className="email"
                  dangerouslySetInnerHTML={renderHTML(data.Message)}
                ></div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No mails found</p>
        )}
      </div>

    </>
  )
}

export default Sent