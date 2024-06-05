import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../components/landing/LandingPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("LandingPage", () => {
  it("renders the welcome message and get started button", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );

    expect(screen.getByText("Welcome to Album Viewer!")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });
});
