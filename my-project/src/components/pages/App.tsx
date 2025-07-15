import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../../assets/logo.svg";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  likes: number;
  dislikes: number;
  coverUrl: string; // <- NEU
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Passe die URL an dein Backend an!
    axios
      .get("http://localhost:3000/api/homepage")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Fehler beim Laden der Posts:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="tabs">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <div className="vline"></div>

          <a
            className="title"
            href="http://localhost:3000/"
            target="_blank"
            rel=""
          >
            CULNEWS
          </a>

          <div className="rvline"></div>

          <div className="circle">
            <div className="search-glass" />
          </div>
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
      <main>
        <ul>
          {posts.map((get, id) => (
            <li key={id}>
              <img
                src={get.coverUrl} // Verwende logo als Fallback
                alt={get.title}
                className="post-cover"
              />
              <h3>{get.title}</h3>
              <p>{get.content}</p>
            </li>
          ))}
        </ul>
      </main>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="tabs">
            <button className="close" onClick={() => setMenuOpen(false)}>
              ✕
            </button>

            <div className="vline"></div>

            <a
              className="title"
              href="http://localhost:3000/"
              target="_blank"
              rel=""
            ></a>

            <div className="rvline"></div>

            <div className="circle">
              <div className="search-glass" />
            </div>
          </div>

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
