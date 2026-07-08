import React from "react";

function Buttons({ handleClear, handlePrevious, handleNext }) {
  return (
    <div className="navbar">
      <button className="btn btn-subtle" onClick={handleClear}>Clear</button>
      <div className="spacer" />
      <button className="btn btn-ghost" onClick={handlePrevious}>Previous</button>
      <button className="btn btn-primary" onClick={handleNext}>Next</button>
    </div>
  );
}

export default Buttons;
