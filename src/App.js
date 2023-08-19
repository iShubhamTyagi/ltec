import React, { useState } from "react";
import "./App.css";
import LoginHeader from "./components/Login/LoginHeader";
import LoginPage from "./components/Login/LoginPage";
import MainCard from "./components/MainCard";
import Footer from "./components/Footer";
import { UserContext } from './components/UserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: null, password: null });

  const handleLogin = (username, password) => {
    setUserDetails({ username, password });
    setLoggedIn(true);
  };

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      <div className="App">
        <div style={{ flex: "1 0 auto" }}>
          {loggedIn ? (
            <MainCard />
          ) : (
            <>
              <LoginHeader />
              <LoginPage onLogin={handleLogin} />
              <Footer />
            </>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
