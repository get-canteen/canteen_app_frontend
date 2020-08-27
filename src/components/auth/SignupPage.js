import React from 'react';
import { connect } from 'react-redux';
import { startCreateUserWithEmailAndPassword } from '../../actions/auth';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, LoginLink, ButtonContainer, FacebookButton, GoogleButton, ButtonText, Footer, FooterText, ErrorMessage, Line } from '../../styles/auth/Authentication';

class SignupPage extends React.Component {
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
                <BoxLayout>
                    <BoxLayoutBox>
                        <img src="/images/logo.png" alt="logo" height="40px"/>
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
                        <Footer>
                            <FooterText> Already have an account? </FooterText>
                            <LoginLink to="/"> Login </LoginLink>
                        </Footer>
                    </BoxLayoutBox>
                </BoxLayout>
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