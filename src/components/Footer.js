import React from "react";
import LungsIcon from "./resources/ltec_icon.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="ftr-inner">
        <div className="ftr-brand">
          <img src={LungsIcon} alt="LTEC" />
          <span className="ftr-brand-name">LTEC</span>
        </div>
        <div className="ftr-meta">
          <span className="ftr-version">v1.2.7</span>
          <span className="ftr-sep">&middot;</span>
          <span>&copy; {year}</span>
          <span className="ftr-sep">&middot;</span>
          <span className="ftr-author">Shubham Tyagi</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
