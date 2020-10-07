import React from 'react';
import Logo from "../../public/images/landingPage/logo.png";

const NavBar = () => (
    <div id="navbar">
    <div id="navbar-block">
      <a id="navbar-logo" href="/">
        <div id="logo">
        <img id="logo-image" src={Logo} alt="Canteen"/>
        </div>
      </a>
      <div id="navbar-menu">
        <a id="navbar-link" href="team">Team</a>
        <a id="nav-sign-up-button" href="/">Sign Up</a>
      </div>
    </div>
  </div>
);

export default NavBar;