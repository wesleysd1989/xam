import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useField } from '@unform/core';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../hooks/user';
import { SignIn } from "../";

jest.mock("react-router-dom", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useNavigate: jest.fn(() => "bar"),
  };
});

jest.mock('../../hooks/user', () => {
  return {
    useUser: jest.fn(),
  };
});

describe("SignIn", () => {
  it('should render correctly', async () => {
    const login = jest.fn();
    (useUser as jest.Mock).mockReturnValue({ login });
    const { debug } = render(<SignIn />);
    const branchField = screen.getByPlaceholderText("Branch ID") as HTMLInputElement;
    const usernameField = screen.getByPlaceholderText("User name") as HTMLInputElement;
    const passwordField = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const submitButton = screen.getByTestId("login");

    fireEvent.change(branchField, { target: { value: "123" } });
    fireEvent.change(usernameField, { target: { value: "user" } });
    fireEvent.change(passwordField, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(branchField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        branch: "123",
        username: 'user',
        password: 'password',
      });
    });
  });
  it('insert correctly login', async () => {
    const login = jest.fn();
    const navigate = jest.fn();
    (useUser as jest.Mock).mockReturnValue({ login });
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { debug } = render(<SignIn />);
    const branchField = screen.getByPlaceholderText("Branch ID") as HTMLInputElement;
    const usernameField = screen.getByPlaceholderText("User name") as HTMLInputElement;
    const passwordField = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const submitButton = screen.getByTestId("login");

    fireEvent.change(branchField, { target: { value: "10001" } });
    fireEvent.change(usernameField, { target: { value: "testuser01" } });
    fireEvent.change(passwordField, { target: { value: "pa55w0rd001" } });
    fireEvent.click(submitButton);

    expect(branchField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        branch: "10001",
        username: 'testuser01',
        password: 'pa55w0rd001',
      });
      expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
