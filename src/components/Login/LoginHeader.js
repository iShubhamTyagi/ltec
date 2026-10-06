import React from "react";
import LungsIcon from "./../resources/ltec_icon.png";

function LoginHeader({ onHome }) {
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <button className="hdr-brand" onClick={onHome} aria-label="Go to home page">
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
        </button>
      </div>
    </header>
  );
}

export default LoginHeader;
