import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import RegistrationService from "./RegistrationService";
import "./login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await RegistrationService().register(
        username,
        email,
        password
      );
      console.log("Registration successful", response.data);

      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="register-page">
      <Typography variant="h4">Registrieren</Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E‑Mail"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          required
        />

        <Box className="register-buttons">
          <button type="submit">Registrieren</button>
        </Box>

        <Box className="register-login-link">
          <button type="button" onClick={() => navigate("/login")}>
            Bereits registriert? Jetzt einloggen
          </button>
        </Box>
      </Box>
    </div>
  );
}

export default Register;
