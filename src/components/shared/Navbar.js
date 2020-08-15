import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const Navbar = ({ id, user, startLogout }) => (
    <div>
        <Link to="/search"> Home </Link>
        <Link to={{ pathname: `/profile/${id}`, state: { user } }}> Profile </Link>
        <Link to="/messages"> Messages </Link>
        <Link to="/notifications"> Notifications </Link>
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