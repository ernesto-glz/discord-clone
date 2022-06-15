import { useInputValue } from 'src/hooks/useInputValue';
import { PulseLoader } from 'react-spinners';
import useLogin from 'src/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Button } from 'src/styled-components/button.styled';
import { getJwt } from 'src/utils/user';
import { AuthInput } from 'src/components/Auth/Input';
import { QRCode } from 'src/components/Auth/QR';
import {
  GeneralContainer,
  ForgotButton,
  FlexBox,
  Form,
  FormBody,
  FormElement,
  FormFooter,
  FormHeader,
  LoginContainer
} from 'src/styled-components/login-and-register';

export interface InputTitleProps {
  error: null | undefined | string;
}

export const Login: React.FC = () => {
  const email = useInputValue('');
  const password = useInputValue('');
  const navigate = useNavigate();
  const { handleLogin, errors, loading } = useLogin({
    email,
    password
  });

  useEffect(() => {
    if (getJwt()) {
      window.location.assign('/channels/@me');
    }
  }, []);

  return (
    <GeneralContainer>
      <Form isRegisterPage={false} onSubmit={handleLogin}>
        <FlexBox>
          <LoginContainer>
            <FormHeader>
              <h3>Welcome back!</h3>
              <div>We&apos;re so excited to see you again!</div>
            </FormHeader>
            <FormBody>
              <FormElement>
                <AuthInput errors={errors} handler={email} title="Email" />
              </FormElement>
              <AuthInput
                errors={errors}
                handler={password}
                title="password"
                type="password"
              />
              <FormElement>
                <ForgotButton>Forgot your password?</ForgotButton>
              </FormElement>
              {loading ? (
                <Button disabled>
                  <PulseLoader color="white" size={7} />
                </Button>
              ) : (
                <Button>Login</Button>
              )}
              <FormFooter>
                <span>Need an account?</span>
                <button type="button" onClick={() => navigate('/register')}>
                  Register
                </button>
              </FormFooter>
            </FormBody>
          </LoginContainer>
          <QRCode />
        </FlexBox>
      </Form>
    </GeneralContainer>
  );
};
