import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top ">
    <div className="container">
      {/* Centered Links (Home, Store, About) */}
      <ul className="navbar-nav mx-auto">
        <li className="nav-item ">
          <a className="nav-link mx-3 text-white font-weight-bold" href="#">HOME</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link mx-3 text-white font-weight-bold" href="#">STORE</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link mx-3 text-white font-weight-bold" href="#">ABOUT</a>
        </li>
      </ul>
      
      <button type="button" className="btn btn-primary position-relative bg-transparent border border-primary">
  cart
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    0
  </span>
</button>
    </div>
  </nav>
  </>
  )
}

export default Navbar