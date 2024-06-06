import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPage from "../components/user/UserPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LoaderProvider } from "../context/LoaderContext";
import * as service from "../services";

jest.mock("../services");

describe("UserPage", () => {
  beforeEach(() => {
    service.getUser.mockImplementation((userId) => {
      if (userId === "1") {
        return Promise.resolve({
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
        });
      }
      return Promise.reject(new Error("User not found"));
    });

    service.getUserAlbums.mockImplementation((userId) => {
      if (userId === "1") {
        return Promise.resolve([
          {
            userId: 1,
            id: 1,
            title: "quidem molestiae enim",
          },
        ]);
      }
      return Promise.resolve([]);
    });
  });

  it("renders user information and their albums for a valid user", async () => {
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/user/1"]}>
          <Routes>
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Bret's Albums")).toBeInTheDocument();
      expect(screen.getByText(/Total Albums:\s*\d+/)).toBeInTheDocument();
      expect(screen.getByText("quidem molestiae enim")).toBeInTheDocument();
      expect(screen.getByText(/Number of Photos:\s*\d+/)).toBeInTheDocument();
    });
  });
});
