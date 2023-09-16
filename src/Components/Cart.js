import React from 'react';
import './cart.css'

const Cart = ({ showCart, handleClose, cartData }) => {
  return (
    <div className={`cart ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
      <div className="cart-content">
          {cartData.map((item) => (
            <div key={item.id} className='content'>
              <div className='item'>{item.name}</div>
              <div className='item'>{item.desc}</div>
              <div className='item'>₹{item.price}</div>
              <div className='item'>1 </div>
            </div>
          ))}
      </div>
      <button className='button'>Generate Bill</button>
    </div>
  );
};

export default Cart;
