import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useCart } from "./CartContext";

const Cart = ({ showCart, handleClose }) => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    // Calculate the total price of items in the cart
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const removeItem = (index) =>{
    removeFromCart(index)
  }

  return (
    <Modal show={showCart} onHide={handleClose} dialogClassName="modal-right modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          {cart.map((item, index) => (
            <div className="row my-2" key={index}>
              <div className="col-2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="img-fluid"
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                />
              </div>
              <div className="col-4">
                <h6>{item.title}</h6>
              </div>
              <div className="col-2">
                <span>${item.price}</span>
              </div>
              <div className="col-2">
                <span>{item.quantity}</span>
              </div>
              <div className="col-2">
                <Button variant="danger" onClick={()=>removeItem(index)}>Remove</Button>
              </div>
              <hr />
            </div>
          ))}
          <div className="row">
            <div className="col text-end">
              <h6>Total: ${calculateTotal()}</h6>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">Purchase</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
