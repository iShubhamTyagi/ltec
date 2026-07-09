import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      © {year} Lung Transplant Eligibility Calculator - v1.2.0
      <br />
      Dr. Rahul Tyagi
    </footer>
  );
}

export default Footer;
