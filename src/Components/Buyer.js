import React, { useEffect, useState } from 'react'
import './buyer.css'
import { useCart } from "./CartContext"; // Import the useCart hook

// Import necessary libraries and hooks

const Buyer = ({ sellerProducts }) => {
    const { cartState, dispatch } = useCart();
useEffect(()=>{
    setLocalProducts(sellerProducts)
})

    const [localProducts, setLocalProducts] = useState([]);
  

    const handleAddToCart = (product, size) => {
        // Find the product in localProducts
        const updatedLocalProducts = [...localProducts];
        const productIndex = updatedLocalProducts.findIndex(
          (item) => item.shoeName === product.shoeName
        );
    
        if (productIndex !== -1) {
          // Find the size within the product
          const { quantities } = updatedLocalProducts[productIndex];
          if (quantities && quantities[size] > 0) {
            // Reduce the quantity of the selected size by 1
            quantities[size] -= 1;
    
            // Update localProducts state with the modified array
            setLocalProducts(updatedLocalProducts);
    
            // Set the updated localProducts array in local storage
            localStorage.setItem("sellerProducts", JSON.stringify(updatedLocalProducts));
    
            // Dispatch the "ADD_TO_CART" action if needed
            dispatch({
              type: "ADD_TO_CART",
              payload: {
                product,
                size,
                quantity: 1,
              },
            });
          }
        }
      };
  
    return (
      <div className="buyer">
        <h2>Products from Seller:</h2>
        <ul>
          {localProducts.map((product, index) => (
            <li key={index}>
              {product.shoeName} &nbsp;
              {product.description} &nbsp;
              ₹{product.price} &nbsp;
              <button onClick={() => handleAddToCart(product, "Large")}>
                Buy Large ({product.quantities.Large})
              </button>{" "}
              &nbsp;
              <button onClick={() => handleAddToCart(product, "Medium")}>
                Buy Medium ({product.quantities.Medium})
              </button>{" "}
              &nbsp;
              <button onClick={() => handleAddToCart(product, "Small")}>
                Buy Small ({product.quantities.Small})
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Buyer;
  
