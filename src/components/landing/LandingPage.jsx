import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to Album Viewer!
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Explore and manage your photo collections with ease. Album Viewer
          allows you to organize, view, and edit your albums efficiently,
          bringing all your memories into one place.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
