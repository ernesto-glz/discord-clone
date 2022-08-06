import { useInputValue } from 'src/hooks/useInputValue';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { FormEvent, useEffect, useState } from 'react';
import { QRCode } from 'src/components/auth/qr-code';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { loginUser } from 'src/redux/states/auth';
import PageWrapper from '../page-wrapper';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import { Input } from 'src/components/UI/input/input';
import { Button } from 'src/components/UI/button/button';

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

  return user ? (
    <Navigate to={'/channels/@me'} />
  ) : (
    <PageWrapper pageTitle={'Discord Clone | Login'}>
      <section className="auth-bg">
        <form className="auth-form login" onSubmit={onSubmit}>
          <div className="left-side">
            <div className="form-header">
              <h3>Welcome back!</h3>
              <div>We&apos;re so excited to see you again!</div>
            </div>
            <div className="form-body">
              <Input
                error={findError(errors, 'EMAIL')}
                handler={email}
                title="Email"
              />
              <div className="mb-20" />
              <Input
                error={findError(errors, 'PASSWORD')}
                handler={password}
                title="password"
                type="password"
              />
              <button className="forgot-button" type="button">
                Forgot your password?
              </button>
              <div className="mb-20" />
              {loading ? (
                <Button disabled>
                  <PulseLoader color="white" size={7} />
                </Button>
              ) : (
                <Button>Login</Button>
              )}
              <div className="form-footer">
                <span>Need an account?</span>
                <button type="button" onClick={() => navigate('/register')}>
                  Register
                </button>
              </div>
            </div>
          </div>
          <QRCode />
        </form>
      </section>
    </PageWrapper>
  );
};

export default LoginPage;
