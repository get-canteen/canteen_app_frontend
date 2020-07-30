import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startCreateUserWithEmailAndPassword } from '../actions/auth';

export class SignupPage extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({ name });
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
        this.props.startCreateUserWithEmailAndPassword(this.state.email, this.state.password);
    }
    render() {
        return (
                <div>
                    <h1> Signup </h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            placeholder="Name" 
                            type="text"
                            autoFocus
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
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
                        {this.props.signupError && <h5>{this.props.signupError.message}</h5>}
                        <button type="submit" onSubmit={this.onSubmit}> Next </button>
                    </form>
                    <div>
                        <h3> Already have an account? </h3>
                        <Link to="/"> Login </Link>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signupError: state.auth.signupError
});

const mapDispatchToProps = (dispatch) => ({
    startCreateUserWithEmailAndPassword: (email, password) => dispatch(startCreateUserWithEmailAndPassword(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);