import React from "react";
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Header({ userSelection, progress }) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#005f73" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          textAlign="left"
          sx={{
            flexGrow: 1,
            whiteSpace: isMobile ? "normal" : "nowrap",
          }}
        >
          {isMobile ? (
            <>
              Lung Transplant<br />Eligibility Calculator
            </>
          ) : (
            "Lung Transplant Eligibility Calculator"
          )}
        </Typography>
        {userSelection && progress !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ marginRight: 1 }}>
              {userSelection}
            </Typography>
            <Box sx={{ position: "relative", marginRight: 1 }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={45}
                sx={{ marginRight: 1 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" component="div">
                  {`${progress}%`}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
