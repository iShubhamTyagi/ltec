import React from "react";
import LungsIcon from "./../resources/ltec_icon.png";

function LoginHeader() {
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <div className="hdr-logo">
          <img src={LungsIcon} alt="Lungs Icon" />
        </div>
        <div className="hdr-title">
          <span className="t1-short">LTEC</span>
          <span className="t1-short-sub">
            <span className="t1-short-sub-line">Lung Transplant</span>
            <span className="t1-short-sub-line">Eligibility Calculator</span>
          </span>
          <span className="t1">Lung Transplant Eligibility Calculator</span>
          <span className="t2">CLINICAL DECISION SUPPORT</span>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
