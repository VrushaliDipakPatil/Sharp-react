import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./Component/AuthForm";
import Expense from "./Component/Expense";
import UpdateProfile from "./Component/UpdateProfile";
import Header from "./Component/Header";
import ExpenseInput from "./ExpenseAppData/ExpenseInput";
import { useSelector } from "../node_modules/react-redux/es/exports";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<AuthForm />} />
        <Route path="/home" element={<Expense />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        {isLoggedIn && (
          <Route path="/expenseinput" element={<ExpenseInput />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
