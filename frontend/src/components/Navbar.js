import React from "react";
import "./Navbar.css"; // we'll create this next

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Addiction Predictor</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        {/* <li><a href="#test">XXX</a></li> */}
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
