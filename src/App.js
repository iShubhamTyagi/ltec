import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import LoginHeader from "./components/Login/LoginHeader";
import LoginPage from "./components/Login/LoginPage";
import MainCard from "./components/MainCard";
import Footer from "./components/Footer";
import { UserContext } from './components/UserContext';

function App() {
  // "landing" | "auth" | "app" — landing is shown first; the existing
  // login gate and its logic below are unchanged.
  const [view, setView] = useState("landing");
  const [userDetails, setUserDetails] = useState({ username: null, password: null });

  const handleLogin = (username, password) => {
    setUserDetails({ username, password });
    setView("app");
  };

  const handleGoHome = () => setView("landing");

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      <div className="app-shell">
        {view === "app" ? (
          <MainCard onHome={handleGoHome} />
        ) : view === "auth" ? (
          <>
            <LoginHeader onHome={handleGoHome} />
            <LoginPage onLogin={handleLogin} />
            <Footer />
          </>
        ) : (
          <>
            <LandingPage onGetStarted={() => setView("auth")} />
            <Footer />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
