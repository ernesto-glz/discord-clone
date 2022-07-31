import { useInputValue } from 'src/hooks/useInputValue';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from 'src/styled-components/button.styled';
import { QRCode } from 'src/components/auth/qr-code';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { loginUser } from 'src/redux/states/auth';
import PageWrapper from '../page-wrapper';
import {
  Background,
  ForgotButton,
  FlexBox,
  Form,
  FormBody,
  FormFooter,
  FormHeader,
  LoginContainer,
  FormDivider
} from 'src/styled-components/auth';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import { Input } from 'src/components/input/input';

export interface InputTitleProps {
  error: null | undefined | string;
}

const LoginPage: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = useInputValue();
  const password = useInputValue();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    if (user) return navigate('/channels/@me');
  }, [user]);

  useEffect(() => {
    events.on('LOGIN_FAILED', (e: any) => {
      setErrors(e);
      setLoading(false);
    });

    return () => {
      events.off('LOGIN_FAILED', () => {});
    };
  }, []);

  return (user) ? (
    <Navigate to={'/channels/@me'} />
  ) : (
    <PageWrapper pageTitle={'Discord Clone | Login'}>
      <Background>
        <Form isRegisterPage={false} onSubmit={onSubmit}>
          <FlexBox>
            <LoginContainer>
              <FormHeader>
                <h3>Welcome back!</h3>
                <div>We&apos;re so excited to see you again!</div>
              </FormHeader>
              <FormBody>
                <Input
                  error={findError(errors, 'EMAIL')}
                  handler={email}
                  title="Email"
                />
                <FormDivider />
                <Input
                  error={findError(errors, 'PASSWORD')}
                  handler={password}
                  title="password"
                  type="password"
                />
                <ForgotButton>Forgot your password?</ForgotButton>
                <FormDivider />
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
      </Background>
    </PageWrapper>
  );
};

export default LoginPage;
