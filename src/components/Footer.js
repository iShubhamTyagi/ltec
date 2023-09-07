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
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        position: "fixed", // Add this line to make the footer sticky
        bottom: 0, // Add this line to position the footer at the bottom
        width: "100%", // Make the footer span the entire width
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2023 Lung Transplant Eligibility Calculator - 1.0.20
        <br />
        Dr. Rahul Tyagi
      </Typography>
    </Box>
  );
}

export default Footer;
