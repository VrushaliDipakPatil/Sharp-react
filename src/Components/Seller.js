import React, { useEffect, useState } from "react";
import "./seller.css";
import Buyer from "./Buyer";
import { CartProvider } from "./CartContext";
import { useCart } from "./CartContext";
import Cart from "./Cart";

const Seller = () => {
    const { cartState } = useCart();
    const initialFormData = {
      shoeName: "",
      description: "",
      price: "",
      Large: "",
      Medium: "",
      Small: "",
    };
  
    // Define a single state object to store all input values
    const [formData, setFormData] = useState(initialFormData);
  
    // Define a state variable to store seller products
    const [sellerProducts, setSellerProducts] = useState([]);
  
    // Define a state variable to store products fetched from local storage
  
    // Function to handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Function to handle "Add Product" button click
    const handleAddProduct = () => {
      // Create a new product object using the formData
      const newProduct = {
        shoeName: formData.shoeName,
        description: formData.description,
        price: formData.price,
        quantities: {
          Large: formData.Large,
          Medium: formData.Medium,
          Small: formData.Small,
        },
      };
  
      // Add the new product to the sellerProducts array
      const updatedProducts = [...sellerProducts, newProduct];
      setSellerProducts(updatedProducts);
  
      // Store the updated products in local storage
      localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts));
  
      // Clear the input fields
      setFormData(initialFormData);
    };
  
    // Fetch products from local storage when the component mounts
    useEffect(() => {
      const savedProducts =
        JSON.parse(localStorage.getItem("sellerProducts")) || [];
 // Store the products in localProducts state
      setSellerProducts(savedProducts); // Store the products in sellerProducts state
    }, []);
  
    const [isCartOpen, setIsCartOpen] = useState(false); // State to manage the cart popup
  
    // Function to toggle the cart popup
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
      };
  
    useEffect(() => {
      // Update the cart item count here
      const itemCount = cartState.items.length;
      const cartElement = document.querySelector(".cart");
      if (cartElement) {
        cartElement.textContent = `Cart (${itemCount})`;
      }
    }, [cartState]);

  return (
    <CartProvider>
      <div className="main">
        <div className="heading">
          <div>Shoe Name</div>
          <input
            type="text"
            name="shoeName"
            value={formData.shoeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="heading">
          <div>Description</div>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="heading">
          <div>Price</div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="heading">
          <div className="sub-heading">Quantity Available</div>
          <div className="check-box">
            <label className="size">
              <input
                type="number"
                name="Large"
                value={formData.Large}
                onChange={handleInputChange}
              />{" "}
              L
            </label>
            <label className="size">
              <input
                type="number"
                name="Medium"
                value={formData.Medium}
                onChange={handleInputChange}
              />{" "}
              M
            </label>
            <label className="size">
              <input
                type="number"
                name="Small"
                value={formData.Small}
                onChange={handleInputChange}
              />{" "}
              S
            </label>
          </div>
        </div>
        <div className="heading">
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
        <div className="heading">
          <div className="cart" onClick={toggleCart}>
            Cart ({cartState.items.length})
          </div>{" "}
          {/* Display the cart item count and add an onClick handler */}
        </div>
      </div>
      <Buyer sellerProducts={sellerProducts} />
      {isCartOpen && (
        <Cart toggleCart={toggleCart} isCartOpen={isCartOpen} />
      )}
    </CartProvider>
  );
};

export default Seller;
