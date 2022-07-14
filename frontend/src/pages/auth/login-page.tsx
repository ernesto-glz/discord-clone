import { useInputValue } from 'src/hooks/useInputValue';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from 'src/styled-components/button.styled';
import { AuthInput } from 'src/components/auth/input';
import { QRCode } from 'src/components/auth/qr-code';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { loginUser } from 'src/redux/states/auth';
import PageWrapper from '../page-wrapper';
import events from 'src/services/event-service';
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
import { searchError } from 'src/utils/utils';
import { PulseLoader } from 'react-spinners';

export interface InputTitleProps {
  error: null | undefined | string;
}

const LoginPage: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    }
  }, []);

  return (user)
    ? <Navigate to={'/channels/@me'} />
    : (
      <PageWrapper pageTitle={'Discord Clone | Login'}>
        <GeneralContainer>
          <Form isRegisterPage={false} onSubmit={onSubmit}>
            <FlexBox>
              <LoginContainer>
                <FormHeader>
                  <h3>Welcome back!</h3>
                  <div>We&apos;re so excited to see you again!</div>
                </FormHeader>
                <FormBody>
                  <FormElement>
                    <AuthInput error={searchError(errors, 'email')} handler={email} title="Email" />
                  </FormElement>
                  <AuthInput error={searchError(errors, 'password')} handler={password} title="password" type="password" />
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
      </PageWrapper>
    );
};

export default LoginPage;