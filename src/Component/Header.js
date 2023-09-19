import React from "react";
import "./header.css";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useDispatch, useSelector } from "../../node_modules/react-redux/es/index";
import { authActions } from "../store/authSlice";
import { expenseActions } from "../store/expenseSlice";

const Header = () => {
  const dispatch= useDispatch();
  const isLoggedIn = useSelector((state)=> state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.loginData());
    dispatch(authActions.UserEmail());
    dispatch(expenseActions.expenseData())
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
          {isLoggedIn && (
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
