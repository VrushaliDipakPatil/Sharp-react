
import './App.css';
import { CartProvider } from './Components/CartContext';
import Seller from './Components/Seller';

function App() {
  return (
    <div className="App">
      <CartProvider>
     <Seller/>
     </CartProvider>
    </div>
  );
}

export default App;
