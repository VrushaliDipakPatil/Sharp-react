import { Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './Component/Card';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import ContactUs from './Component/ContactUs';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/home" exact element={<Home/>} />
          <Route path="/" element={<Card/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<ContactUs/>} />
          </Routes>
        <Footer />
 
    </div>
  );
}

export default App;
