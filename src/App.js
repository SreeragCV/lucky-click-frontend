import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import GamePage from "./components/GamePage";
import Navbar from "./components/Navbar";
import "./App.css";
import AnimatedBackground from "./components/AnimatedBackground";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  console.log("token!!!!!!!!!!!!!!", token);
  

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  return (
    <Router>
      <Toaster/>
      <AnimatedBackground/>
      <Navbar token={token} setToken={handleSetToken} />
      <Routes>
        <Route path="/" element={<AuthForm token={token} setToken={handleSetToken} />} />
        <Route
          path="/game"
          element={<GamePage token={token} setToken={handleSetToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
