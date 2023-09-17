import { useContext, useState } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
    conpassword: "",
  });

  const authCtx = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  const SubmitHandler = (event) => {
    event.preventDefault();
    setIsLoding(true);
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
          setIsLoding(false);
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
          authCtx.login(data.idToken);
          navigate('/home')
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="conpassword">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="conpassword"
              value={user.conpassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className={classes.actions}>
          {isLoding ? (
            "Sending Request...."
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}

          <button
            type="button"
            className={classes.toggle}
            style={{color:"blue"}}
          >
            {isLogin && "Forgot Password"}
          </button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
