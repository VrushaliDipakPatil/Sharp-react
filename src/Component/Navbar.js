import React, { useContext, useState } from "react";
import Cart from "./Cart";
import { Link, NavLink } from "../../node_modules/react-router-dom/dist/index";
import { useCart } from "./CartContext";
import AuthContext from "../store/auth-context";

const Navbar = () => {

  const authCtx = useContext(AuthContext)

  const [cartData, setCartData] = useState([]);

  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
 
  const toggleCart = () => {
    getCartData()
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const getCartData =()=>{
    let emailid = "test1gmailcom";
    fetch(
      `https://crudcrud.com/api/e415a7cfb2774ac2aab845aaf3068416/cart${emailid}`
    )
      .then((response) => response.json())
      .then((data) => setCartData(data));
  }



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
            {authCtx.isLoggedIn && (
            <li className="nav-item ">
            <NavLink
              to="/store"
              className="nav-link mx-3 text-white font-weight-bold"
            >
              STORE
            </NavLink>{" "}
          </li>
            )}

            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                ABOUT
              </NavLink>{" "}
            </li>
            <li className="nav-item ">
              <NavLink
                to="/auth"
                className="nav-link mx-3 text-white font-weight-bold"
              >
                LOGIN
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
      <Cart showCart={showCart} handleClose={handleCloseCart} cartData={cartData}/>
    </>
  );
};

export default Navbar;
