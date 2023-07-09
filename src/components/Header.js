import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#005f73" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Lung Transplant Eligibility Calculator
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
