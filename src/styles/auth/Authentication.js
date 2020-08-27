import styled from 'styled-components';
import { Colors, FontSize, Spacing } from '../../constants/constants';
import { Link } from 'react-router-dom';

export const BoxLayout = styled.div`
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    background-size: cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`; 

export const BoxLayoutBox = styled.div`
    background: white;
    border-radius: 3px;
    padding: ${Spacing.m_size} ${Spacing.m_size};
    margin-bottom: ${Spacing.small};
    text-align: center;
    width: 20rem;
    opacity: 0.9;
`;

export const Title = styled.h2`
    margin: ${Spacing.s_size} 0;
    font-size: ${FontSize.large};
    font-weight: 600;
    line-height: 1;
`; 

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    background: ${Colors.light_blue};
    border: 1px solid #ccc;
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
    padding: ${Spacing.xs_size} ${Spacing.xs_size};
`;

export const ForgotLink = styled(Link)`
    font-size: ${FontSize.small};
    align-self: flex-start;
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
    color: #1a6edb;
`;

export const SubmitButton = styled.button`
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    font-size: ${FontSize.large};
    font-weight: 300;
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
    padding: ${Spacing.xs_size} ${Spacing.xs_size};
    cursor: pointer;
`;

export const Line = styled.hr`
    display: block;
    height: 1px;
    border-top: 1px solid #ccc;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${Spacing.m_size};
`;

export const GoogleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    font-size: ${FontSize.large};
    font-weight: 300;
    padding: ${Spacing.xs_size};
    cursor: pointer;
`;

export const FacebookButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    font-size: ${FontSize.large};
    font-weight: 300;
    padding: ${Spacing.xs_size};
    cursor: pointer;
`;

export const ButtonText = styled.span`
    margin-left: ${Spacing.xs_size};
`;

export const SignupLink = styled(Link)`
    font-size: ${FontSize.small};
    font-weight: 300;
    margin-bottom: ${Spacing.xs_size};
    color: #1a6edb;
`;

export const LoginLink = styled(Link)`
    font-size: ${FontSize.small};
    font-weight: 300;
    margin-bottom: ${Spacing.xs_size};
    color: #1a6edb;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${FontSize.small};
`;

export const FooterText = styled.span`
    margin: 0 ${Spacing.s_size} ${Spacing.xs_size} 0;
    color: ${Colors.grey};
    font-weight: 700;
`;

export const ErrorMessage = styled.span`
    color: ${Colors.red};
    font-size: ${FontSize.small};
    margin-bottom: ${Spacing.xs_size};
`;

export const Message = styled.span`
    color: ${Colors.blue};
    font-size: ${FontSize.small};
    margin-bottom: ${Spacing.xs_size};
`;
