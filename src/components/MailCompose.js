import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { useSelector } from 'react-redux';

const MailCompose = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const senderemail = useSelector((state) => state.auth.user_email)

    const removeSpecialCharacters = (email) => {
      return email.replace(/[@.]/g, '');
    };

  
    const handleSendEmail = async () => {
      try {
        const receiverUserId = removeSpecialCharacters(to); // Replace with actual receiver's user ID
        const senderUserId = removeSpecialCharacters(senderemail); // Replace with actual sender's user ID
  
        // Send the email to the receiver
        const senderresponse = await fetch(`https://react-mail-c09ee-default-rtdb.firebaseio.com/email/sent/${senderUserId}.json`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            From : senderemail,
            Subject: subject,
            Message : message,
            To: to
          })
        })
        if(!senderresponse.ok){
          throw new Error("Mail not sent")
        }
  
        // Store the email in the sender's "sent" folder
        const receiverresponse = await fetch(`https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${receiverUserId}.json`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            From : senderemail,
            Subject: subject,
            Message : message,
            To: to
          })
        })
        if(!receiverresponse.ok){
          throw new Error("Mail not sent")
        }
  
        alert('Email sent successfully.');
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send email.');
      }
    };
    
  return (
    <div className="container" style={{width: '50%' }}>
    <h2>Compose Email</h2>
    <div className="mb-3">
      <label htmlFor="to" className="form-label">
        To:
      </label>
      <input
        type="email"
        className="form-control"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="subject" className="form-label">
        Subject:
      </label>
      <input
        type="text"
        className="form-control"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="message" className="form-label">
        Message:
      </label>
      <ReactQuill
        value={message}
        onChange={(value) => setMessage(value)}
        className="quill-editor"
      />
    </div>
    <button className="btn btn-primary" onClick={handleSendEmail}>
      Send Email
    </button>
  </div>
  )
}

export default MailCompose