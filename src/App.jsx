import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/HomePage";
import UserPage from "./components/user/UserPage";
import AlbumPage from "./components/album/AlbumPage";
import PhotoPage from "./components/photo/PhotoPage";
import LandingPage from "./components/landing/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/loader/GlobalLoader";
import ErrorBoundary from "./components/Error/ErrorBoundary";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoaderProvider>
          <GlobalLoader />
          <Router>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/user/:userId" element={<UserPage />} />
                  <Route path="/album/:albumId" element={<AlbumPage />} />
                  <Route path="/photo/:photoId" element={<PhotoPage />} />
                </Route>
              </Routes>
            </ErrorBoundary>
          </Router>
        </LoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
