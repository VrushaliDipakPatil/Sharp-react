import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const AllMails = () => {

    const email = useSelector((state) => state.auth.user_email)
    const removeSpecialCharacters = (email) => {
        return email.replace(/[@.]/g, '');
      };

const [mails, setMails] = useState(null)
      
      useEffect(()=>{
        fetchAllMails()
      },[])

      const fetchAllMails = useCallback(async () => {

        const emailId = removeSpecialCharacters(email)
        try {
          const [inboxResponse, sentResponse] = await Promise.all([
            fetch(
              `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/inbox/${emailId}.json`
            ),
            fetch(
              `https://react-mail-c09ee-default-rtdb.firebaseio.com/email/sent/${emailId}.json`
            ),
          ]);
      
          if (!inboxResponse.ok) {
            throw new Error("Something went wrong while fetching inbox.");
          }
          if (!sentResponse.ok) {
            throw new Error("Something went wrong while fetching sent mails.");
          }
      
          const inboxData = await inboxResponse.json();
          const sentData = await sentResponse.json();
      
          const allMails = [...Object.values(inboxData || {}), ...Object.values(sentData || {})];
          setMails(allMails)
    console.log(allMails)
        } catch (error) {
          console.error("Error fetching mails:", error);
        }
      }, [ email, removeSpecialCharacters]);

      const renderHTML = (htmlString) => {
        return { __html: htmlString };
      };

  return (
    <div className="container mt-5">
    <h1 className="mb-4">All</h1>
    {mails !== null ? (
      mails.map((data) => (
        <div className="card" key={data.id}>
          <div className="card-body">
            <h6 className="card-text">From: {data.From}</h6>
            <h5 className="card-title">{data.Subject}</h5>
            <p className="card-text" dangerouslySetInnerHTML={renderHTML(data.Message)}></p>
            <h6 className="card-text">To: {data.To}</h6>
            <a href="#" className="btn btn-primary">
              Read Email
            </a>
          </div>
        </div>
      ))
    ) : (
      <p>No mails found</p>
    )}
  </div>
  )
}

export default AllMails