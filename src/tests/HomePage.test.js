import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../components/home/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { LoaderProvider } from "../context/LoaderContext";
import * as service from "../services";

jest.mock("../services");

describe("HomePage", () => {
  beforeEach(() => {
    service.getUsers.mockResolvedValue([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
      },
    ]);
    service.getAllAlbums.mockResolvedValue([
      {
        userId: 1,
        id: 1,
        title: "quidem molestiae enim",
      },
    ]);
  });

  it("displays users and their album counts", async () => {
    render(
      <LoaderProvider>
        <Router>
          <HomePage />
        </Router>
      </LoaderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Bret")).toBeInTheDocument();
      expect(screen.getByText(/View Albums \(\d+\)/)).toBeInTheDocument();
    });
  });
});
