import React, { useState } from "react";
import LungsIcon from "./../resources/ltec_icon.png";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [hospital, setHospital] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (username && hospital) {
      setError(null);
      onLogin(username, hospital);
    } else {
      setError("Please enter your name and hospital name!");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError(null);
  };

  const handleHospitalChange = (e) => {
    setHospital(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="login-wrap" onKeyDown={handleKeyPress}>
      <div className="card login-card">
        <div className="login-mark">
          <img src={LungsIcon} alt="LTEC" />
        </div>
        <h1>Welcome</h1>
        <p className="sub">Enter your details to continue</p>
        <div className="fields">
          <div className="field">
            <label htmlFor="login-username">Your Name</label>
            <input
              id="login-username"
              className="field-input"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="field">
            <label htmlFor="login-hospital">Hospital Name</label>
            <input
              id="login-hospital"
              className="field-input"
              type="text"
              placeholder="Enter your hospital name"
              value={hospital}
              onChange={handleHospitalChange}
            />
          </div>
        </div>
        <button className="btn btn-primary" disabled={loading} onClick={handleLogin}>
          Continue
        </button>
        <div className="login-err">{error}</div>
      </div>
    </div>
  );
}

export default LoginPage;
