import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2023 Lung Transplant Eligibility Calculator. All rights reserved.
        <br />
        Dr. Rahul Tyagi
      </Typography>
    </Box>
  );
}

export default Footer;
