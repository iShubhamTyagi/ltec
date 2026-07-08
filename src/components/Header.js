import React, { useState, useEffect } from "react";
import LungsIcon from "./resources/ltec_icon.png";

function Header({ userSelection, progress, updateTimer }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;
    if (progress === -100) {
      setTimer(0);
    } else if (progress < 100) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      updateTimer(timer);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [progress]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

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
        <div className="hdr-spacer" />
        {userSelection && (
          <div className="hdr-meta">
            <div className="hdr-disease">
              <span className="dot" />
              <span className="label-full">{userSelection}</span>
            </div>
            <div className="hdr-progress">
              <div className="pbar-top">
                <span>PROGRESS</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="pbar">
                <i style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="hdr-timer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {formatTime(timer)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
