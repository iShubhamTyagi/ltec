import React from "react";
import { AppBar, Toolbar, Typography, CircularProgress, Box } from "@mui/material";

function Header({ progress }) {
  return (
    <AppBar position="static" style={{ backgroundColor: "#005f73" }}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Lung Transplant Eligibility Calculator
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="white" style={{ marginRight: "10px" }}>
            {Math.round(progress)}%
          </Typography>
          <CircularProgress
            variant="determinate"
            value={progress}
            color="secondary"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
