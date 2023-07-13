import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Header({ userSelection, progress }) {
  return (
    <AppBar position="static" style={{ backgroundColor: "#005f73" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Lung Transplant Eligibility Calculator
        </Typography>
        {userSelection && progress !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" component="div">
              {userSelection}
            </Typography>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={20}
              sx={{ marginRight: 2 }}
            />
            <Typography variant="body2" component="div">
              {`${progress}%`}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
