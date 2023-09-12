import React, { useState } from "react";
import Cart from "./Cart";
import { Link, NavLink } from "../../node_modules/react-router-dom/dist/index";
import { useCart } from "./CartContext";

const Navbar = () => {

  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
 
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top ">
        <div className="container">
          {/* Centered Links (Home, Store, About) */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item ">
              <NavLink
                to="/home"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                STORE
              </NavLink>{" "}
            </li>
            <li className="nav-item ">
              <NavLink
                to="/about"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                ABOUT
              </NavLink>{" "}
            </li>
            <li className="nav-item ">
              <NavLink
                to="/contact"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                CONTACT US
              </NavLink>{" "}
            </li>
          </ul>

          <button
            type="button"
            onClick={toggleCart}
            className="btn btn-primary position-relative bg-transparent border border-primary"
          >
            cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
            </span>
          </button>
        </div>
      </nav>
      <Cart showCart={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
