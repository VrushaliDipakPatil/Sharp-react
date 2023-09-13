// CartContext.js
import { createContext, useContext, useState } from "react";
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemInCartIndex = prevCart.findIndex((cartItem) => cartItem.title === item.title);

      if (itemInCartIndex !== -1) {
        // If the item is already in the cart, increment its quantity
        const updatedCart = [...prevCart];
        updatedCart[itemInCartIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the item is not in the cart, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
