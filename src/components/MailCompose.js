import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const MailCompose = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = () => {
        const userId = 'getUserIdHere'; // Replace with the actual userId (you can retrieve this after the user logs in)
    
        const emailData = {
          to,
          subject,
          message,
        };
    
        // Initialize Firebase and get a reference to the database
        // const database = firebase.database();
    
        // Push the email to the user's emails node
        // database.ref(`emails/${userId}`).push(emailData, (error) => {
        //   if (error) {
        //     alert('Failed to send email.');
        //   } else {
        //     alert('Email sent successfully.');
        //   }
        // });
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