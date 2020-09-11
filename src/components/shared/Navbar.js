import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Navbar = ({ authUid, startLogout }) => (
    <div>
        <NavLink activeClassName="active" to="/home"> Home </NavLink>
        <NavLink activeClassName="active" to={`/profile/${authUid}`}> Profile </NavLink>
        <NavLink activeClassName="active" to="/messages"> Messages </NavLink>
        <NavLink activeClassName="active" to="/notifications"> Notifications </NavLink>
        <button onClick={startLogout}> Logout </button>
    </div>
)

Navbar.propTypes = {
    authUid: PropTypes.string.isRequired,
    startLogout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);