import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    conpassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (!isLogin && user.password !== user.conpassword) {
      alert("Password fields are not matching....");
    } else {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
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
              let errorMessage = "Authentication Failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          dispatch(authActions.loginData(data.idToken));
          dispatch(authActions.UserEmail(data.email));
          dispatch(authActions.login());
          console.log("user login successfully");
            navigate("/mailhome");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7XEOc6O8Svn_udxhDjDsiXVK2J2lv66c",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: user.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Password Reset Failed: ${errorData.error.message}`);
        throw new Error(`Password Reset Failed: ${errorData.error.message}`);
      }

      alert("please check your mail to reset your password...");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h1 className="card-title text-center">{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={SubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Your Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="conpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="conpassword"
                  name="conpassword"
                  value={user.conpassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary" type="submit">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>

            <button
              type="button"
              className="btn btn-link"
              onClick={handleForgotPassword}
            >
              {isLogin && "Forgot Password"}
            </button>

            <button
              type="button"
              className="btn btn-link"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
