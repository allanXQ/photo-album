import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// Mock @react-oauth/google
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({ onSuccess }) => (
    <button
      onClick={() =>
        onSuccess({
          credential:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.-7TfXybv5-9I2l-8I8h3JwOl4E7YQrzR7S1MNXS3YPI",
        })
      }
    >
      Sign in with Google
    </button>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LoginPage", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login button", () => {
    render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("navigates after successful login", () => {
    render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
    fireEvent.click(screen.getByText("Sign in with Google"));
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
