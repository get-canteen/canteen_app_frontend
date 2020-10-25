import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(
      { 
        pathname:`/signup`,
        state: { email: '' } 
      }
    )
  }
  return(
    <div id="navbar">
    <div id="navbar-block">
      <a id="navbar-logo" href="/">
        <div id="logo">
        <img id="logo-image" src="/images/landingPage/logo.png" alt="Canteen"/>
        </div>
      </a>
      <div id="navbar-menu">
        <a id="navbar-link" href="/teamPage">Team</a>
        <button id="nav-sign-up-button" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  </div>
  )
};

export default withRouter(NavBar);