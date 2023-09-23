import { useState } from 'react';

const useSendEmail = () => {
  const sendEmail = async (senderEmail, receiverEmail, subject, message) => {
    try {
      const senderUserId = removeSpecialCharacters(senderEmail);
      const receiverUserId = removeSpecialCharacters(receiverEmail);

      // Send the email to the receiver
      const senderResponse = await fetch(
        `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/sent/${senderUserId}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            From: senderEmail,
            Subject: subject,
            Message: message,
            To: receiverEmail,
          }),
        }
      );

      if (!senderResponse.ok) {
        throw new Error('Mail not sent');
      }

      // Store the email in the receiver's "inbox" folder
      const receiverResponse = await fetch(
        `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${receiverUserId}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            From: senderEmail,
            Subject: subject,
            Message: message,
            To: receiverEmail,
            isRead: false,
          }),
        }
      );

      if (!receiverResponse.ok) {
        throw new Error('Mail not sent');
      }

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email.');
    }
  };

  const removeSpecialCharacters = (email) => {
    return email.replace(/[@.]/g, '');
  };

  return { sendEmail };
};

export default useSendEmail;
