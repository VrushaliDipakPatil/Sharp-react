import React, { createContext, useContext, useReducer } from "react";

// Create a context
const CartContext = createContext();

// Initial state for the cart
const initialCartState = {
  items: [],
};

// Cart reducer
// ...

const getTotalCartCount = (items) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const { product, size, quantity } = action.payload;
  
        const updatedCartItems = state.items.map((item) => {
          if (item.product === product && item.size === size) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
  
        const newItem = {
          product,
          size,
          quantity,
        };
  
        const existingItem = state.items.find(
          (item) => item.product === product && item.size === size
        );
  
        if (!existingItem) {
          return { ...state, items: [...updatedCartItems, newItem] };
        } else {
          return { ...state, items: updatedCartItems };
        }
  
      case "REMOVE_FROM_CART":
        const updatedItems = state.items.filter(
          (item) =>
            !(item.product === action.payload.product && item.size === action.payload.size)
        );
        return { ...state, items: updatedItems };
  
      default:
        return state;
    }
  };
  
  // ...
  

// Cart context provider
export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
    const cartCount = getTotalCartCount(cartState.items); // Calculate the cart count
  
    return (
      <CartContext.Provider value={{ cartState, dispatch, cartCount }}>
        {children}
      </CartContext.Provider>
    );
  };

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};
