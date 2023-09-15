import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Card from "./Component/Card";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
// import Home from "./Component/Home";
import About from "./Component/About";
import ContactUs from "./Component/ContactUs";
import CardDetail from "./Component/CardDetail";
import AuthForm from "./Component/AuthForm";
import { Suspense, lazy, useContext } from "react";
import AuthContext from "./store/auth-context";

const Home = lazy(()=> import('./Component/Home'));
const Card = lazy(()=> import('./Component/Card'));


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
      <Routes>
      <Route path="/" element={<About />} />
 
        <Route path="/home" exact element={ <Suspense fallback={<p>Loading...</p>}><Home /></Suspense>} />
        {authCtx.isLoggedIn && <Route path="/store" element={<Card />} />}
      
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/:productId" element={<CardDetail />} />

      </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
