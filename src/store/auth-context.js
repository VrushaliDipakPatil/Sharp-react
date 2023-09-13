import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initalToken = localStorage.getItem("sharp-token");
  const [token, setToken] = useState(initalToken);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const userIsLoggedIn = !!token;

  const LogInHandler = (token) => {
    localStorage.setItem("sharp-token", token);
    setToken(token);

    const timer = setTimeout(() => {
      LogoutHandler();
    }, 300000); // 5 minutes in milliseconds

    setLogoutTimer(timer);
  };

  const LogoutHandler = () => {
    setToken(null);
    localStorage.removeItem("sharp-token");

    if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
  
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      // Set a new logout timer when the token changes
      const timer = setTimeout(() => {
        LogoutHandler();
      }, 300000); // 5 minutes in milliseconds

      setLogoutTimer(timer);
    }
  }, [userIsLoggedIn, token]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LogInHandler,
    logout: LogoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
