import React from 'react';
import { useCart } from "./CartContext";
import './cart.css'

const Cart = ({toggleCart , isCartOpen }) => {
  const { cartState, dispatch, cartCount } = useCart();

  const handleCancel = () => {
    toggleCart(); // Close the cart
  };

  // Function to group cart items by product and size
  const groupCartItems = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      const key = `${item.product.shoeName}_${item.size}`;
      if (!groupedItems[key]) {
        groupedItems[key] = {
          product: item.product,
          quantities: { [item.size]: item.quantity },
        };
      } else {
        groupedItems[key].quantities[item.size] = (groupedItems[key].quantities[item.size] || 0) + item.quantity;
      }
    });
    return Object.values(groupedItems);
  };

  // Calculate the total price for each grouped item
  const calculateTotalPrice = (groupedItems) => {
    return groupedItems.map((item) => {
      const { price } = item.product;
      const totalQuantity = Object.values(item.quantities).reduce((total, quantity) => total + quantity, 0);
      return {
        ...item,
        totalQuantity,
        totalPrice: price * totalQuantity,
      };
    });
  };

  const groupedCartItems = groupCartItems(cartState.items);
  const cartItemsWithTotalPrice = calculateTotalPrice(groupedCartItems);

  const handleRemoveFromCart = (product, sizes) => {
    Object.keys(sizes).forEach(size => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          product,
          size,
        },
      });
    });
  };

  const cartTotal = cartItemsWithTotalPrice.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className={`cart ${isCartOpen ? 'open' : ''}`}>
      <h2>Cart ({cartCount})</h2>
      <ul>
        {cartItemsWithTotalPrice.map((item, index) => (
          <li key={index}>
            {item.product.shoeName} &nbsp;
            {Object.entries(item.quantities).map(([size, quantity]) => (
              <span key={size}>
                {quantity} {size}&nbsp;
              </span>
            ))}
            Total Price: ₹{item.totalPrice} &nbsp;
            <button onClick={() => handleRemoveFromCart(item.product, item.quantities)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Cart Total: ₹{cartTotal}</strong>
      </div>
      <div className="cart-buttons">
        <button className="place-order-button" >
          Place Order
        </button>
        <button className="cancel-button" >
          cancel
        </button>
      </div>
    </div>
  );
};

export default Cart;
