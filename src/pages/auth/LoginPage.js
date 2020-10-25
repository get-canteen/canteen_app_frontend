import React from 'react';
import { connect } from 'react-redux';
import { startLoginWithEmailAndPassword, startLoginWithGoogle, startLoginWithFacebook } from '../../actions/auth';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, ForgotLink, SignupLink, ButtonContainer, FacebookButton, GoogleButton, ButtonText, Footer, FooterText, ErrorMessage, Line } from '../../styles/auth/Authentication';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class LoginPage extends React.Component {
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
                <BoxLayout>
                    <BoxLayoutBox>
                    <Link>
                    <img src="/images/canteen/logo.png" alt="logo" height="40px"/>
                    </Link>
                        <Title> Sign in </Title>
                        <Form onSubmit={this.onSubmit}>
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
                            {this.props.loginError && <ErrorMessage>{this.props.loginError.message}</ErrorMessage>}
                            <ForgotLink to="/forgot"> Forgot password? </ForgotLink>
                            <SubmitButton type="submit" onSubmit={this.onSubmit}> Continue </SubmitButton>
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
                            <FooterText> Don't have an account? </FooterText>
                            <SignupLink to="/signup"> Sign Up </SignupLink>
                        </Footer>
                    </BoxLayoutBox>
                </BoxLayout>
        )
    }
}

LoginPage.propTypes = {
    match: PropTypes.object.isRequired,
    loginError: PropTypes.object
};

const mapStateToProps = (state) => ({
    loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
    startLoginWithEmailAndPassword: (email, password) => dispatch(startLoginWithEmailAndPassword(email, password)),
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
    startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);