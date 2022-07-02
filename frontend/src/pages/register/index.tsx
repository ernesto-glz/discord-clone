import React, { useEffect } from 'react';
import {
  Form,
  FormBody,
  FormHeader,
  FormElement,
  FormFooter,
  GeneralContainer
} from 'src/styled-components/login-and-register';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useInputValue } from 'src/hooks/useInputValue';
import useRegister from 'src/hooks/useRegister';
import { Button } from 'src/styled-components/button.styled';
import { getJwt } from 'src/utils/user';
import { AuthInput } from 'src/components/auth/input';

export interface GeneralFormProps {
  isRegisterPage: boolean;
}

export const Register: React.FC = () => {
  const username = useInputValue('');
  const email = useInputValue('');
  const password = useInputValue('');
  const navigate = useNavigate();
  const { handleRegister, errors, loading } = useRegister({
    username,
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
      <Form isRegisterPage onSubmit={handleRegister}>
        <FormHeader>
          <h3>Create an account!</h3>
        </FormHeader>
        <FormBody>
          <FormElement>
            <AuthInput errors={errors} handler={email} title="email" />
          </FormElement>
          <FormElement>
            <AuthInput errors={errors} handler={username} title="username" />
          </FormElement>
          <FormElement>
            <AuthInput
              errors={errors}
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
  );
};
