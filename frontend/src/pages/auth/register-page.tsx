import React, { FormEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInputValue } from 'src/hooks/useInputValue';
import { Button } from 'src/styled-components/button.styled';
import { AuthInput } from 'src/components/auth/input';
import PageWrapper from '../page-wrapper';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import events from 'src/services/event-service';
import { searchError } from 'src/utils/utils';
import { PulseLoader } from 'react-spinners';
import {
  Form,
  FormBody,
  FormHeader,
  FormElement,
  FormFooter,
  GeneralContainer
} from 'src/styled-components/login-and-register';
import { registerUser } from 'src/redux/states/auth';

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
    }))
  }

  useEffect(() => {
    events.on('REGISTER_FAILED', (e) => {
      setErrors(e);
      setLoading(false);
    })
    return () => {
      events.off('REGISTER_FAILED', () => {});
    }
  }, [])

  return (user) 
    ? <Navigate to={'/channels/@me'} /> 
    : (
      <PageWrapper pageTitle={'Discord Clone | Register'}>
        <GeneralContainer>
          <Form isRegisterPage onSubmit={onSubmit}>
            <FormHeader>
              <h3>Create an account!</h3>
            </FormHeader>
            <FormBody>
              <FormElement>
                <AuthInput 
                  error={searchError(errors, 'email')} handler={email} title="email" 
                />
              </FormElement>
              <FormElement>
                <AuthInput 
                  error={searchError(errors, 'username')} handler={username} title="username"
                 />
              </FormElement>
              <FormElement>
                <AuthInput
                  error={searchError(errors, 'password')}
                  handler={password}
                  title="password"
                  type="password"
                />
              </FormElement>
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
        </GeneralContainer>
      </PageWrapper>
   );
};

export default RegisterPage;