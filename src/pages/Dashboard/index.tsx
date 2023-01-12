import React, { useRef, useCallback, useEffect } from "react";
import { FiUser, FiDatabase, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getValidationErrors } from "../../utils";

import { Button, Input, TableUsers } from "../../components";

import {
  ButtonContainer,
  Container,
  AnimationContainer,
  HeaderContainer,
  TableContainer,
  FormButtonContainer,
} from "./styles";
import { useUser } from "../../hooks/user";

interface SignInFormData {
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { users, logged, register, remove, logout, username } = useUser();

  useEffect(() => {
    if (!logged) {
      navigate("/");
    } else {
      
    }
  }, [navigate, logged]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          branchId: Yup.number().required("Branch id is required"),
          userName: Yup.string().required("User is required"),
          password: Yup.string().required("Password is required"),
          firstName: Yup.string().required("firstName is required"),
          middleName: Yup.string().required("middleName is required"),
          lastName: Yup.string().required("lastName is required"),
          position: Yup.string().required("position is required"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        register(data);
        toast("User successfully registered", {
          type: "success",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [register]
  );

  return (
    <Container>
      <HeaderContainer>
        <h1>{username}</h1>
        <ButtonContainer>
          <Button onClick={logout}>Logout</Button>
        </ButtonContainer>
      </HeaderContainer>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="branchId" icon={FiDatabase} placeholder="Branch ID" />
          <Input name="userName" icon={FiUser} placeholder="User name" />
          <Input name="firstName" icon={FiUser} placeholder="First Name" />
          <Input name="middleName" icon={FiUser} placeholder="Middle Name" />
          <Input name="lastName" icon={FiUser} placeholder="Last Name" />
          <Input name="position" icon={FiUser} placeholder="Position" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <FormButtonContainer>
            <Button
              className="white"
              onClick={() => {
                formRef.current?.reset();
              }}
            >
              RESET
            </Button>
            <Button type="submit">ADD</Button>
          </FormButtonContainer>
        </Form>
        <TableContainer>
          <TableUsers users={users} remove={remove} />
        </TableContainer>
      </AnimationContainer>
    </Container>
  );
};

export default Dashboard;
