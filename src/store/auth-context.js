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

  };

  const LogoutHandler = () => {
    setToken(null);
    localStorage.removeItem("sharp-token");

  };

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
