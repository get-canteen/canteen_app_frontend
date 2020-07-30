import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Navbar = ({ startLogout }) => (
    <div>
        <Link to="/home"> Home </Link>
        <Link to="/search"> Search </Link>
        <Link to="/messages"> Messages </Link>
        <Link to="/notifications"> Notifications </Link>
        <button onClick={startLogout}> Logout </button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Navbar);