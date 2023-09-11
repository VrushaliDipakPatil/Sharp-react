import React, { useState } from "react";
import Cart from "./Cart";
import { Link } from "../../node_modules/react-router-dom/dist/index";

const Navbar = () => {
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
              <Link
                to="/home"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                STORE
              </Link>{" "}
            </li>
            <li className="nav-item ">
              <Link
                to="/about"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                ABOUT
              </Link>{" "}
            </li>
          </ul>

          <button
            type="button"
            onClick={toggleCart}
            className="btn btn-primary position-relative bg-transparent border border-primary"
          >
            cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </button>
        </div>
      </nav>
      <Cart showCart={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
