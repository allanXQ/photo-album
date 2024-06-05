import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPage from "../components/user/UserPage";
import { LoaderProvider } from "../context/LoaderContext";
import axios from "axios";

jest.mock("axios");

describe("UserPage", () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case "https://jsonplaceholder.typicode.com/users?id=1":
          return Promise.resolve({
            data: [
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
                phone: "1-770-736-8031 x56442",
                website: "hildegard.org",
                company: {
                  name: "Romaguera-Crona",
                  catchPhrase: "Multi-layered client-server neural-net",
                  bs: "harness real-time e-markets",
                },
              },
            ],
          });
        case "https://jsonplaceholder.typicode.com/albums?userId=1":
          return Promise.resolve({
            data: [
              {
                userId: 1,
                id: 1,
                title: "quidem molestiae enim",
              },
            ],
          });
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });

  it("renders user information and their albums", async () => {
    render(
      <LoaderProvider>
        <Router initialEntries={["/user/1"]}>
          <UserPage />
        </Router>
      </LoaderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Bret's Albums")).toBeInTheDocument();
      expect(screen.getByText(/Total Albums: \(\d+\)/)).toBeInTheDocument();
      expect(screen.getByText("quidem molestiae enim")).toBeInTheDocument();
      expect(screen.getByText(/Number of Photos: \(\d+\)/)).toBeInTheDocument();
    });
  });
});
