import React from "react";
import { Link } from "react-router-dom";
import "./expense.css";

const Expense = () => {
  const handleEmailVerify = async () => {
    try {
     const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c",{
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("sharp-token"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Email verification failed: ${errorData.error.message}`);
      }
  
      const responseData = await response.json();
      console.log("Email verification successful:", responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="header">
        <div className="heading">Welcome to expense Tracker App!!!</div>
        <button className="button" onClick={handleEmailVerify}>
          Verify Email
        </button>
        <div className="incomplete">
          Your Profile is incomplete .
          <Link to="/updateprofile">Complete now</Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Expense;
