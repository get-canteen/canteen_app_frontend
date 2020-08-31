import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const Navbar = ({ id, user, startLogout }) => (
    <div>
        <NavLink activeClassName="active" to="/search"> Home </NavLink>
        <NavLink activeClassName="active" to={{ pathname: `/profile/${id}`, state: { user } }}> Profile </NavLink>
        <NavLink activeClassName="active" to="/messages"> Messages </NavLink>
        <NavLink activeClassName="active" to="/notifications"> Notifications </NavLink>
        <button onClick={startLogout}> Logout </button>
    </div>
)

const mapStateToProps = (state) => ({
    id: state.auth.user.uid,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);