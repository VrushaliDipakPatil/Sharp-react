import React, { useEffect, useRef } from "react";
import "./updateprofile.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "../../node_modules/react-router-dom/dist/index";

const UpdateProfile = () => {
  const nameRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    lookupData();
  }, []);

  const SubmitHandler = (event) => {
    event.preventDefault();

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: localStorage.getItem("sharp-token"),
        displayName: nameRef.current.value,
        photoUrl: profileRef.current.value,
        // deleteAttribute: "",
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Updation Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("profile updated successfully!!!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const lookupData = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("sharp-token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.users && data.users.length > 0) {
          const user = data.users[0];
          nameRef.current.value = user.displayName;
          profileRef.current.value = user.photoUrl;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="header">
        <div className="heading">
          Winners never quite, Quitters never win!!!
        </div>
        <div className="incomplete">
          Your Profile is <b>64%</b> completed. A complete profile has higher
          chances of landing a job .<Link to="#">Complete now</Link>
        </div>
      </div>
      <hr />
      <div className="input-form">
        <div className="col">
          <div className="contact-detail">Contact Details</div>
          <button className="cancel">Cancel</button>
        </div>
        <div className="col">
          <div>
            {" "}
            <GitHubIcon /> Full Name :
          </div>
          <input type="text" ref={nameRef} />
          <div>
            {" "}
            <LinkIcon /> Profile Phote URL :
          </div>
          <input type="text" ref={profileRef} />
        </div>
        {nameRef && profileRef && (
          <div className="col" style={{color: "gray"}}>
            Your profile is updated, You can edit profile again....
          </div>
        )}

        <div className="col">
          <button className="update" onClick={SubmitHandler}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
