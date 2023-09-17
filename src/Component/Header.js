import React, { useContext } from "react";
import "./header.css";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import AuthContext from "../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sharp-token");
    navigate("/");
  };

  const handleExpensePage = () => {
    navigate("./expenseinput");
  };

  return (
    <>
      <div className="main-header">
        <div className="main-heading">Expense Tracker</div>
        <div className="switch-buttons">
          {authCtx.isLoggedIn && (
            <button className="logout-button" onClick={handleExpensePage}>
              Expenses
            </button>
          )}

          <button className="logout-button" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
