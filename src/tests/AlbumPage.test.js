import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlbumPage from "../components/album/AlbumPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LoaderProvider } from "../context/LoaderContext";
import * as service from "../services";

jest.mock("../services");

describe("AlbumPage", () => {
  beforeEach(() => {
    service.getAlbumById.mockImplementation((albumId) => {
      if (albumId === "1") {
        return Promise.resolve({
          userId: 1,
          id: 1,
          title: "quidem molestiae enim",
        });
      }
      return Promise.reject(new Error("Album not found"));
    });

    service.getAlbumPhotos.mockImplementation((albumId) => {
      if (albumId === "1") {
        return Promise.resolve([
          {
            albumId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            url: "https://via.placeholder.com/600/92c952",
            thumbnailUrl: "https://via.placeholder.com/150/92c952",
          },
        ]);
      }
      return Promise.resolve([]);
    });
  });

  it("renders album details and associated photos for a valid album", async () => {
    render(
      <LoaderProvider>
        <MemoryRouter initialEntries={["/album/1"]}>
          <Routes>
            <Route path="/album/:albumId" element={<AlbumPage />} />
          </Routes>
        </MemoryRouter>
      </LoaderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Total Photos:\s*\d+/)).toBeInTheDocument();
      expect(
        screen.getByText("accusamus beatae ad facilis cum similique qui sunt")
      ).toBeInTheDocument();
    });
  });
});
