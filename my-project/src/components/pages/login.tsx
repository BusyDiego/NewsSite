import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LoginService from "./loginService";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await LoginService().login(email, password);
      console.log("Login erfolgreich", response.data);

      // Weiterleitung nach erfolgreichem Login
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setErrorLog("Login failed. E-Mail or Password is wrong.");
    }
  };

  return (
    <div className="Login">
      <Box>
        <h1>Login</h1>
      </Box>

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <div className="Loginfields">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
          />
        </div>

        <div className="Login-buttons">
          <button type="submit">Login</button>
        </div>

        <div className="register">
          <button type="button" onClick={() => navigate("/register")}>
            Noch kein Account? Jetzt registrieren
          </button>
        </div>

        {errorLog && <Typography color="error">{errorLog}</Typography>}
      </Box>
    </div>
  );
}

export default Login;
