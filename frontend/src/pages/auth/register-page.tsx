import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInputValue } from 'src/hooks/useInputValue';
import { Button } from 'src/styled-components/button.styled';
import PageWrapper from '../page-wrapper';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { findError } from 'src/utils/errors';
import { PulseLoader } from 'react-spinners';
import {
  Form,
  FormBody,
  FormHeader,
  FormFooter,
  Background,
  FormDivider
} from 'src/styled-components/auth';
import { registerUser } from 'src/redux/states/auth';
import { Input } from 'src/components/input/input';

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
      email: email.value
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

  return (user) ? (
    <Navigate to={'/channels/@me'} />
  ) : (
    <PageWrapper pageTitle={'Discord Clone | Register'}>
      <Background>
        <Form isRegisterPage onSubmit={onSubmit}>
          <FormHeader>
            <h3>Create an account!</h3>
          </FormHeader>
          <FormBody>
            <Input
              error={findError(errors, 'EMAIL')}
              handler={email}
              title="email"
            />
            <FormDivider />
            <Input
              error={findError(errors, 'USERNAME')}
              handler={username}
              title="username"
            />
            <FormDivider />
            <Input
              error={findError(errors, 'PASSWORD')}
              handler={password}
              title="password"
              type="password"
            />
            <FormDivider />
            {loading ? (
              <Button disabled>
                <PulseLoader color="white" size={7} />
              </Button>
            ) : (
              <Button>Continue</Button>
            )}
            <FormFooter>
              <button type="button" onClick={() => navigate('/login')}>
                Already have an account ?
              </button>
            </FormFooter>
          </FormBody>
        </Form>
      </Background>
    </PageWrapper>
  );
};

export default RegisterPage;
