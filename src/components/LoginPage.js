import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoginWithEmailAndPassword } from '../actions/auth';

export class LoginPage extends React.Component {
    state = {
        email: '',
        password: ''
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState({ email });
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState({ password });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.startLoginWithEmailAndPassword(this.state.email, this.state.password);
    }
    render() {
        return (
                <div>
                    <h1> Log In </h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            placeholder="Email" 
                            type="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <input
                            placeholder="Password" 
                            type="text"
                            autoFocus
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        {this.props.loginError && <h5>{this.props.loginError.message}</h5>}
                        <button type="submit" onSubmit={this.onSubmit}> Next</button>
                    </form>
                    <div>
                        <Link to='/forgot'> Forgot password? </Link>
                        <h3> Don't have an account? </h3>
                        <Link to="/signup"> Sign Up </Link>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
    startLoginWithEmailAndPassword: (email, password) => dispatch(startLoginWithEmailAndPassword(email, password)),
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);