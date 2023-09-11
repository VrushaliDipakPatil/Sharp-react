import { Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './Component/Card';
import Footer from './Component/Footer';
import Heading from './Component/Heading';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Heading />
      <Routes>
          <Route path="/home" exact element={<Home/>} />
          <Route path="/" element={<Card/>} />
          <Route path="/about" element={<About/>} />
          </Routes>
        <Footer />
 
    </div>
  );
}

export default App;
