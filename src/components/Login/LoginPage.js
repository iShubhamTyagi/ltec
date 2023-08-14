import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import {
  MainCardContainer,
  MainCardContent,
  MainCardTitle,
  ButtonsContainerOuter,
} from "./../StyledComponents";

const LoginField = styled(TextField)({
  marginBottom: "16px",
});

const LoginButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
});


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (username && password === "123") {
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

  return (
    <MainCardContainer onKeyDown={handleKeyPress}>
      <MainCardContent>
        <MainCardTitle variant="h5">Login</MainCardTitle>

        <LoginField
          fullWidth
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginField
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonsContainerOuter container>
          <LoginButton
            disabled={loading}
            className="previous-next-button"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </LoginButton>
        </ButtonsContainerOuter>
        <div style={{ height: '20px' }}>
  {error && <Typography color="error" variant="h6">{error}</Typography>}
</div>
      </MainCardContent>
    </MainCardContainer>
  );
}

export default LoginPage;
