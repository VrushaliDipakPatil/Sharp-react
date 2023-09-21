import { Route, Routes } from "react-router-dom";
import "./App.css";
import MailHome from "./components/MailHome";
import AuthForm from "./components/AutForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element ={<AuthForm />}/>
        <Route path="mailhome" element={<MailHome/>} />
      </Routes>
      
    </div>
  );
}

export default App;
