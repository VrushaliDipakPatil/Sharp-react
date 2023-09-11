import React from "react";
import { Modal, Button } from "react-bootstrap";

const Cart = ({ showCart, handleClose }) => {
  const cartElements = [
    {
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",

      quantity: 2,
    },

    {
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",

      quantity: 3,
    },

    {
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",

      quantity: 1,
    },
  ];

  return (
    <Modal show={showCart} onHide={handleClose} dialogClassName="modal-right">
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col">
              <h6>Item</h6>
            </div>
            <div className="col">
              <h6>Price</h6>
            </div>
            <div className="col">
              <h6>Quantity</h6>
            </div>
          </div>
          {cartElements.map((item, index) => (
            <div className="row" key={index}>
              <div className="col">
                <span>{item.title}</span>
              </div>
              <div className="col">${item.price}</div>
              <div className="col">{item.quantity}</div>
            </div>
          ))}
                    <hr />
          <div className="row">
            <div className="col text-end">
              <h6>Total: $0</h6>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancle
        </Button>
        <Button variant="primary">Purchase</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
