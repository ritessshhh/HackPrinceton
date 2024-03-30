import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

import { loginAPIMethod } from "../api/client";

export default function Login({
  username,
  setUsername,
  isLoading,
  setIsLoading,
}) {
  const navigate = useNavigate();

  const navigateAfterLogin = async () => {
    setIsLoading(true);
    console.log("Logging in...");
    const loginResponse = await loginAPIMethod(username);
    console.log("Logged in!", loginResponse);
    setIsLoading(false);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div>
        <img className="logo" src="logo.png"></img>
      </div>

      <h2>Welcome</h2>

      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="login-btn" onClick={navigateAfterLogin}>Login</button>

      <div>
        <Link className="password">Forgot Password?</Link>
      </div>
    </div>
  );
}
