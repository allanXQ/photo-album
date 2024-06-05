import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext"; // Ensure this context provides the login method
import { Box, Typography, Container } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential); // Assuming jwtDecode to decode the Google token
    login({
      name: decodedToken.name,
      email: decodedToken.email,
      tokenExpiry: decodedToken.exp,
    });
    navigate("/home");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box sx={{ mt: 1 }}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
          // theme="filled_black" // A theme option provided by the GoogleLogin component to style the button
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
