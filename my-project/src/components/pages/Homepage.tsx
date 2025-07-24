import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import logo from "../../assets/logo.svg";
import axios from "axios";
import PostCard from "../templates/PostCard";
import { baseInstance } from "./Api";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CreatePost from "./CreatePost";
import IconButton from "@mui/material/IconButton";

type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  likes: number;
  dislikes: number;
  coverUrl: string;
  author_id: number;
  createdAt: string;
  updatedAt: string;
};

interface JwtPayload {
  sub: string;
  roles: string[]; // <-- deine Rollen kommen hier rein
  iat: number;
  exp: number;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const roles: string[] = useMemo(() => {
    if (!token) return [];
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.roles || [];
    } catch {
      return [];
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Posts:", error);
        setError(
          "Fehler beim Laden der Posts. Bitte versuchen Sie es später erneut."
        );
        setLoading(false);
      });
  }, []);

  const canPost = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_WRITER");

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [posts, selectedCategory, searchTerm]);

  /*useEffect(() => {
    axios
      .get<CountResponse>("http://localhost:8080/api/comments/count")
      .then((res) => setCommentCount(res.data.count))
      .catch((err) => console.error(err));
  }, []);*/

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

          <div
            className="circle"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ cursor: "pointer" }}
          >
            <div className="search-glass" />
          </div>
          {searchOpen && (
            <input
              id="search-input"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSearchOpen(false);
                }
              }}
              style={{
                position: "absolute",
                right: "60px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "200px",
                padding: "5px 10px",
                border: "1px solid #000",
                backgroundColor: "#d9d9d9",
                fontSize: "14px",
              }}
              autoFocus
            />
          )}
        </div>

        <div className="divider">
          <ul className="nav-links">
            <a
              onClick={() => setSelectedCategory("Fashion")}
              style={{
                cursor: "pointer",
                fontWeight: selectedCategory === "Fashion" ? "bold" : "normal",
              }}
            >
              Fashion
            </a>
            <a
              onClick={() => setSelectedCategory("Film")}
              style={{
                cursor: "pointer",
                fontWeight: selectedCategory === "Film" ? "bold" : "normal",
              }}
            >
              Film
            </a>
            <a
              onClick={() => setSelectedCategory("All")}
              style={{
                cursor: "pointer",
                fontWeight:
                  selectedCategory === "All" || !selectedCategory
                    ? "bold"
                    : "normal",
              }}
            >
              All
            </a>
            <a
              onClick={() => setSelectedCategory("Art")}
              style={{
                cursor: "pointer",
                fontWeight: selectedCategory === "Art" ? "bold" : "normal",
              }}
            >
              Art
            </a>
            <a
              onClick={() => setSelectedCategory("Music")}
              style={{
                cursor: "pointer",
                fontWeight: selectedCategory === "Music" ? "bold" : "normal",
              }}
            >
              Music
            </a>
          </ul>
        </div>

        <div className="divider"></div>
      </header>

      {/* "+"-Button für alle Benutzer */}
      <Link to="/create-post" className="create-post-btn">
        <IconButton size="large">+</IconButton>
      </Link>
      <div className="Posts">
        {loading && <div className="loading-message">Loading Posts...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="no-posts-message">No Posts found.</div>
        )}
        {!loading &&
          !error &&
          filteredPosts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
      </div>
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
              <Link to={token ? `/account` : `/login`}>Account</Link>
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
            {token && (
              <li>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
