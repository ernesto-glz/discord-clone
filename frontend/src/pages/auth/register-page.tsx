import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInputValue } from 'src/hooks/useInputValue';
import PageWrapper from '../page-wrapper';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import { registerUser } from 'src/redux/states/auth';
import { Input } from 'src/components/UI/input/input';
import { Button } from 'src/components/UI/button/button';

export interface GeneralFormProps {
  isRegisterPage: boolean;
}

const RegisterPage: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = useInputValue();
  const email = useInputValue();
  const password = useInputValue();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(registerUser({
      username: username.value,
      password: password.value,
      email: email.value,
    }));
  };

  useEffect(() => {
    events.on('REGISTER_FAILED', (e) => {
      setErrors(e);
      setLoading(false);
    });
    return () => {
      events.off('REGISTER_FAILED', () => {});
    };
  }, []);

  return user ? (
    <Navigate to={'/channels/@me'} />
  ) : (
    <PageWrapper pageTitle={'Discord Clone | Register'}>
      <section className="auth-bg">
        <form className="auth-form register" onSubmit={onSubmit}>
          <div className="form-header">
            <h3>Create an account!</h3>
          </div>
          <div className='form-body'>
            <Input
              error={findError(errors, 'EMAIL')}
              handler={email}
              title="email"
            />
            <div className="mb-20" />
            <Input
              error={findError(errors, 'USERNAME')}
              handler={username}
              title="username"
            />
            <div className="mb-20" />
            <Input
              error={findError(errors, 'PASSWORD')}
              handler={password}
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
