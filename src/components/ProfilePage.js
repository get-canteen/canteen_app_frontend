import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const ProfilePage = () => (
    <div>
        <h1> Profile Page </h1>
        <button onClick={startLogout}> Logout </button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(ProfilePage);