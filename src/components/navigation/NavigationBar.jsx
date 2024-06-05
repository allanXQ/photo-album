import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutButton from "../auth/LogoutButton";

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Album Viewer
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
