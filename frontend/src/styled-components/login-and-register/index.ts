import { InputTitleProps } from 'src/pages/Login';
import { GeneralFormProps } from 'src/pages/Register';
import styled from 'styled-components';

export const GeneralContainer = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/assets/background.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form<GeneralFormProps>`
  padding: 32px;
  font-size: 18px;
  box-sizing: border-box;
  width: ${(props) => (props.isRegisterPage ? '450px' : '784px')};
  color: #72767d;
  background-color: var(--background-mobile-primary);
  border-radius: 5px;
  @media (max-width: 830px) {
    max-width: 480px;
  }
`;

export const LoginContainer = styled.div`
  width: 100%;
  padding-right: 50px;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  > h3 {
    color: var(--header-primary);
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
  > div {
    font-size: 16px;
    line-height: 20px;
    color: var(--header-secondary);
  }
`;

export const FormBody = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 20px;
`;

export const FormElement = styled.div`
  margin-bottom: 20px;
`;

export const InputTitle = styled.h5<InputTitleProps>`
  color: ${(props) =>
    props.error ? 'var(--text-danger)' : 'var(--header-secondary)'};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 10px;
  > span {
    text-transform: uppercase;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--text-danger);
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  text-transform: none;
  font-weight: bold;
  margin-left: 4px;
`;

export const FormFooter = styled.div`
  margin-top: 6px;
  > span {
    font-size: 14px;
    line-height: 16px;
  }
  > button {
    color: var(--text-link);
    display: inline-block;
    margin-left: 4px;
    margin-bottom: 0;
    vertical-align: bottom;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    margin-bottom: 1px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ForgotButton = styled.button`
  color: var(--text-link);
  display: block;
  padding-left: 0;
  padding-right: 0;
  margin-top: 6px;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
