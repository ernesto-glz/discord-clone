import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { QRCode } from 'src/components/auth/qr-code';
import { useAppSelector } from 'src/redux/hooks';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import { FormInput } from 'src/components/UI/input/form-input';
import { Button } from 'src/components/UI/button/button';
import { useLogin } from 'src/hooks/auth/useLogin';
import PageWrapper from '../page-wrapper';

export interface LoginValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { onSubmit, errors, loading, register } = useLogin();
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();

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
              <FormInput
                error={findError(errors, 'EMAIL')}
                {...register('email')}
                title="Email"
              />
              <div className="mb-20" />
              <FormInput
                error={findError(errors, 'PASSWORD')}
                {...register('password')}
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
