import React, { useState } from "react";
import { HomePage } from "./components/pages";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="tabs">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <div className="vline" />

          <a
            className="title"
            href="http://localhost:3000/"
            target="_blank"
            rel=""
          >
            News
          </a>
          <div className="right-side"></div>
          <div className="vline" />
        </div>

        <div className="circle">
          <div className="search-glass" />
        </div>

        <div className="divider">
          <ul className="nav-links">
            <a href="/">Fashion</a>
            <a href="/">Film</a>
            <a href="/">All</a>
            <a href="/">Art</a>
            <a href="/">Music</a>
          </ul>
        </div>

        <div className="divider"></div>
      </header>

      <HomePage />

      {menuOpen && (
        <div className="menu-overlay">
          <button className="close" onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          <ul>
            <li>
              <a href="/">Account</a>
            </li>
            <li>
              <a href="/">Settings</a>
            </li>
            <li>
              <a href="/">Videos</a>
            </li>
            <li>
              <a href="/">Projects</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
