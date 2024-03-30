import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

import { loginAPIMethod } from "../api/client";

export default function SignUp({
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
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div>
        <img className="logo" src="logo.png"></img>
      </div>
      <h4 style={{ marginBottom: "0" }}>User Name</h4>
      <input type="text" placeholder="Enter your username" />
      <h4 style={{ marginBottom: "0" }}>Age</h4>
      <input type="text" placeholder="Enter your age" />
      <h4 style={{ marginBottom: "0" }}>Gender</h4>
      <select name="genderStatus" id="genderStatus" className="input">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="PreferNotToSay">Prefer Not To Say</option>
      </select>
      <h4 style={{ marginBottom: "0" }}>Depression Status</h4>
      <select name="depressionStatus" id="depressionStatus" className="input">
        <option value="Male">None</option>
        <option value="Female">Vulnerable</option>
        <option value="PreferNotToSay">Severe</option>
      </select>
      <button className="login-btn" onClick={navigateAfterLogin}>
        Sign Up
      </button>
    </div>
  );
}
