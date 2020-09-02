import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import styled from 'styled-components';

export const Navbar = ({ id, startLogout }) => (
    <div>
        <NavLink activeClassName="active" to="/home"> Home </NavLink>
        <NavLink activeClassName="active" to={`/profile/${id}`}> Profile </NavLink>
        <NavLink activeClassName="active" to="/messages"> Messages </NavLink>
        <NavLink activeClassName="active" to="/notifications"> Notifications </NavLink>
        <button onClick={startLogout}> Logout </button>
    </div>
)

const mapStateToProps = (state) => ({
    id: state.auth.user.uid
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);