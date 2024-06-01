import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home/HomePage";
import UserPage from "./components/user/UserPage";
import AlbumPage from "./components/album/AlbumPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
