import { useEffect, useState } from 'react';
import { mailActions } from '../store/mailslice';
import { useDispatch } from 'react-redux';

const useFetchInboxMail = (email) => {
    const dispatch = useDispatch()
  const [inboxMail, setInboxMail] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  let intervalId;  // Store the interval ID

  const fetchInboxMail = async () => {
    try {
      const emailId = email.replace(/[@.]/g, '');
      const response = await fetch(
        `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${emailId}.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong while fetching inbox.');
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
      setInboxMail(loadedInbox);
      setCount(unreadEmailCount)
      dispatch(mailActions.UnreadCount(unreadEmailCount))
      dispatch(mailActions.InboxData(loadedInbox));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPeriodically = () => {
    fetchInboxMail(); // Initial fetch

    intervalId = setInterval(() => {
      fetchInboxMail(); // Fetch every 2 seconds
    }, 2000);
  };

  useEffect(() => {
    fetchPeriodically();

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run this effect once

  return { inboxMail, error };
};

export default useFetchInboxMail;
