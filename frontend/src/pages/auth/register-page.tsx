import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PageWrapper from '../page-wrapper';
import { useAppSelector } from 'src/redux/hooks';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import { Button } from 'src/components/UI/button/button';
import { FormInput } from 'src/components/UI/input/form-input';
import { useRegister } from 'src/hooks/auth/useRegister';

const RegisterPage: React.FC = () => {
  const { onSubmit, errors, loading, register } = useRegister();
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();

  return user ? (
    <Navigate to={'/channels/@me'} />
  ) : (
    <PageWrapper pageTitle={'Discord Clone | Register'}>
      <section className="auth-bg">
        <form className="auth-form register" onSubmit={onSubmit}>
          <div className="form-header">
            <h3>Create an account!</h3>
          </div>
          <div className="form-body">
            <FormInput
              error={findError(errors, 'EMAIL')}
              {...register('email')}
              title="email"
            />
            <div className="mb-20" />
            <FormInput
              error={findError(errors, 'USERNAME')}
              {...register('username')}
              title="username"
            />
            <div className="mb-20" />
            <FormInput
              error={findError(errors, 'PASSWORD')}
              {...register('password')}
              title="password"
              type="password"
            />
            <div className="mb-20" />
            {loading ? (
              <Button disabled>
                <PulseLoader color="white" size={7} />
              </Button>
            ) : (
              <Button>Continue</Button>
            )}
            <div className="form-footer">
              <button type="button" onClick={() => navigate('/login')}>
                Already have an account ?
              </button>
            </div>
          </div>
        </form>
      </section>
    </PageWrapper>
  );
};

export default RegisterPage;
