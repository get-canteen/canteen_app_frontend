import React from 'react';
import { connect } from 'react-redux';
import { startCreateUserWithEmailAndPassword, startLoginWithGoogle, startLoginWithFacebook } from '../../actions/auth';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, LoginLink, ButtonContainer, FacebookButton, GoogleButton, ButtonText, Footer, FooterText, ErrorMessage, Line } from '../../styles/auth/Authentication';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class SignupPage extends React.Component {
    state = {
        name: '',
        email: this.props.location.state.email ? this.props.location.state.email : "",
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
                <BoxLayout>
                    <BoxLayoutBox>
                        <Link to = "/">
                            <img src="/images/canteen/logo.png" alt="logo" height="40px"/>
                        </Link>
                        <Title> Sign up </Title>
                        <Form onSubmit={this.onSubmit}>
                            <Input
                                placeholder="Name" 
                                type="text"
                                autoFocus
                                value={this.state.name}
                                onChange={this.onNameChange}
                            />
                            <Input
                                placeholder="Email" 
                                type="email"
                                autoFocus
                                value={this.state.email}
                                onChange={this.onEmailChange}
                            />
                            <Input
                                placeholder="Password" 
                                type="text"
                                autoFocus
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                            />
                            {this.props.signupError && <ErrorMessage>{this.props.signupError.message}</ErrorMessage>}
                            <SubmitButton type="submit" onSubmit={this.onSubmit}> Next </SubmitButton>
                        </Form>
                        <Line/>
                        <ButtonContainer>
                            <FacebookButton onClick={this.props.startLoginWithFacebook}> 
                                <img src="/images/provider/facebook.svg" alt="facebook-logo" width="20" height="30"/>
                                <ButtonText>
                                    Continue
                                </ButtonText>
                            </FacebookButton>
                            <GoogleButton onClick={this.props.startLoginWithGoogle}> 
                                <img src="/images/provider/google.svg" alt="google-logo" width="20" height="30"/>
                                <ButtonText>
                                    Continue
                                </ButtonText>
                            </GoogleButton>
                        </ButtonContainer>
                        <Footer>
                            <FooterText> Already have an account? </FooterText>
                            <LoginLink to="/loginPage"> Login </LoginLink>
                        </Footer>
                    </BoxLayoutBox>
                </BoxLayout>
        )
    }
}

SignupPage.propTypes = {
    match: PropTypes.object.isRequired,
    signupError: PropTypes.object,
    startCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
    startLoginWithFacebook: PropTypes.func.isRequired,
    startLoginWithGoogle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    signupError: state.auth.signupError
});

const mapDispatchToProps = (dispatch) => ({
    startCreateUserWithEmailAndPassword: (email, password) => dispatch(startCreateUserWithEmailAndPassword(email, password)),
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);