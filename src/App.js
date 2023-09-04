import { useEffect, useState } from "react";
import FoemInput from "./components/FoemInput";
import Orders from "./components/Orders";



function App() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleAddToBill = (orderData) => {
    const updatedOrders = [...orders, orderData];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleUpdateOrders = (updatedOrders) => {

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div>
<FoemInput onAddToBill={handleAddToBill}/>
<Orders orders={orders} updateOrdersInLocalStorage={handleUpdateOrders}/>
    </div>
  );
}

export default App;






