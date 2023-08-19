import React from "react";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import LungsIcon from "./../resources/ltec_icon.png";

function LoginHeader() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0067B3" }}>
      <Toolbar>
        <img
          src={LungsIcon}
          alt="Lungs Icon"
          style={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            marginRight: isMobile ? 8 : 15,
          }}
        />

        <Typography
          variant={isMobile ? "h8" : "h5"}
          component="div"
          textAlign="left"
          sx={{
            flexGrow: 1,
            whiteSpace: isMobile ? "normal" : "nowrap",
            fontSize: isMobile ? "1.25rem" : "2rem",
          }}
        >
          {isMobile ? (
            <>
              Lung Transplant Eligibility Counter
            </>
          ) : (
            "Lung Transplant Eligibility Calculator"
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default LoginHeader;
