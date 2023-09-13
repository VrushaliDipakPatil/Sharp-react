import { Route, Routes } from "react-router-dom";
import "./App.css";
import Card from "./Component/Card";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import ContactUs from "./Component/ContactUs";
import CardDetail from "./Component/CardDetail";
import AuthForm from "./Component/AuthForm";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" exact element={<Home />} />
        {authCtx.isLoggedIn && <Route path="/store" element={<Card />} />}
        <Route path="/" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/:productId" element={<CardDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
