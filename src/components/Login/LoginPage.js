import React, { useState } from "react";
import LungsIcon from "./../resources/ltec_icon.png";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (username && password === "LT@1234") {
      setError(null);
      onLogin(username, password);
    } else {
      setError("Invalid username or password!");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="login-wrap" onKeyDown={handleKeyPress}>
      <div className="card login-card">
        <div className="login-mark">
          <img src={LungsIcon} alt="LTEC" />
        </div>
        <h1>Sign in</h1>
        <p className="sub">Enter your credentials to continue</p>
        <div className="fields">
          <div className="field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              className="field-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="field-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <button className="btn btn-primary" disabled={loading} onClick={handleLogin}>
          Sign In
        </button>
        <div className="login-err">{error}</div>
      </div>
    </div>
  );
}

export default LoginPage;
