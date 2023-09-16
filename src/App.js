import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./Component/AuthForm";
import Expense from "./Component/Expense";
import UpdateProfile from "./Component/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<AuthForm />} />
        <Route path="/home" element={<Expense />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
      </Routes>
    </div>
  );
}

export default App;
