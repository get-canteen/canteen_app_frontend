import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startSendPasswordResetEmail } from '../actions/auth';

export class ForgotPasswordPage extends React.Component {
    state = {
        email: ''
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.startSendPasswordResetEmail(this.state.email);
    }
    render() {
        return (
            <div>
                <h1> Forgot Password </h1>
                <form onSubmit={this.onSubmit}>
                    <input 
                        placeholder="Email"
                        type="input"
                        onChange={this.onEmailChange}
                        value={this.state.email}
                    />
                    {this.props.sendPasswordReset && <p> Please check your email. You can reset your password in provided link. </p>}
                    <button> Next </button>
                </form>
                <div>
                    <h3> Don't have an account? </h3>
                    <Link to="/signup"> Sign Up </Link>
                </div>
            </div>

        )
    }
};

const mapStateToProps = (state) => ({
    sendPasswordReset: state.auth.sendPasswordReset
});

const mapDispatchToProps = (dispatch) => ({
    startSendPasswordResetEmail: (email) => dispatch(startSendPasswordResetEmail(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);