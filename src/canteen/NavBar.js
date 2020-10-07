import React from 'react';

const NavBar = () => (
    <div id="navbar">
    <div id="navbar-block">
      <a id="navbar-logo" href="/">
        <div id="logo">
        <img id="logo-image" src="/images/landingPage/logo.png" alt="Canteen"/>
        </div>
      </a>
      <div id="navbar-menu">
        <a id="navbar-link" href="team">Team</a>
        <a id="nav-sign-up-button" href="/signup">Sign Up</a>
      </div>
    </div>
  </div>
);

export default NavBar;