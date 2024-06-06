import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography, Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
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
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
