import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext"; // Ensure this context provides the login method
import { Box, Typography, Button, Container } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    // Assuming jwtDecode to decode the Google token
    const decodedToken = jwtDecode(credentialResponse.credential);
    login({
      name: decodedToken.name,
      email: decodedToken.email,
      tokenExpiry: decodedToken.exp,
    });
    navigate("/home");
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Welcome to Album Viewer!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          Explore and manage your photo collections seamlessly.
        </Typography>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      </Box>
    </Container>
  );
};

export default LandingPage;
