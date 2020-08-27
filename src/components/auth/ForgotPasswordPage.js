import React from 'react';
import { connect } from 'react-redux';
import { startSendPasswordResetEmail } from '../../actions/auth';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, Footer, FooterText, SignupLink, Line, Message } from '../../styles/auth/Authentication';

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
            <BoxLayout>
                <BoxLayoutBox>
                    <img src="/images/logo.png" alt="logo" height="40px"/>
                    <Title> Forgot Password </Title>
                    <Form onSubmit={this.onSubmit}>
                        <Input 
                            placeholder="Email"
                            type="input"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                        />
                        {this.props.sendPasswordReset && <Message> Please check your email. You can reset your password in provided link. </Message>}
                        <SubmitButton> Next </SubmitButton>
                    </Form>
                    <Footer>
                        <FooterText> Don't have an account? </FooterText>
                        <SignupLink to="/signup"> Sign Up </SignupLink>
                    </Footer>
                </BoxLayoutBox>
            </BoxLayout>

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