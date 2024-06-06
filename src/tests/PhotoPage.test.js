import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PhotoPage from "../components/photo/PhotoPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LoaderProvider } from "../context/LoaderContext";
import * as service from "../services";

jest.mock("../services");

describe("PhotoPage", () => {
  beforeEach(() => {
    service.getPhotoById.mockImplementation((photoId) => {
      if (photoId === "1") {
        return Promise.resolve({
          albumId: 1,
          id: 1,
          title: "accusamus beatae ad facilis cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        });
      }
      return Promise.reject(new Error("Photo not found"));
    });

    service.updatePhotoTitle.mockImplementation((photoId, newTitle) => {
      if (photoId === "1") {
        return Promise.resolve({
          status: 200,
        });
      }
      return Promise.reject(new Error("Photo not found"));
    });
  });

  it("renders photo details for a valid photo", async () => {
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/photo/1"]}>
          <Routes>
            <Route path="/photo/:photoId" element={<PhotoPage />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Photo: accusamus beatae ad facilis cum similique qui sunt"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(
          "accusamus beatae ad facilis cum similique qui sunt"
        )
      ).toBeInTheDocument();
    });
  });

  it("attempts to update the photo title but does not change it", async () => {
    const newTitle = "updated title";
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/photo/1"]}>
          <Routes>
            <Route path="/photo/:photoId" element={<PhotoPage />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    await waitFor(() => {
      const updateButton = screen.getByRole("button", {
        name: /save/i,
      });
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: newTitle },
      });
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      expect(service.updatePhotoTitle).toHaveBeenCalledWith("1", newTitle);
    });
  });
});
