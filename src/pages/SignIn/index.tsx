import React, { useRef, useCallback } from "react";
import { FiUser, FiDatabase, FiLock } from "react-icons/fi";
import { toast } from 'react-toastify';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

import { getValidationErrors } from "../../utils";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, AnimationContainer } from "./styles";
import { useUser } from "../../hooks/user";

interface SignInFormData {
  branch: number;
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async ({ branch, username, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          branch: Yup.number().required("Branch id is required"),
          username: Yup.string().required("User is required"),
          password: Yup.string().required("Password is required"),
        });

        await schema.validate(
          { branch, username, password },
          {
            abortEarly: false,
          }
        );
        login({ branch, username, password })
        navigate('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        toast('Branch ID, Username or Password invalid, please try again', {
          type: 'error',
        });
      }
    },
    [login, navigate]
  );

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input name="branch" icon={FiDatabase} placeholder="Branch ID" />
          <Input name="username" icon={FiUser} placeholder="User name" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" data-testid="login">Login</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default SignIn;
