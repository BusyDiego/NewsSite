import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../../assets/logo.svg";
import axios from "axios";
import PostCard from "../templates/PostCard";
import { baseInstance } from "./Api";

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

function PostArticle() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/${post.id}")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => console.error("Fehler beim Laden der Posts:", error));
  }, []);

  return (
    <>
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

      <div className="PostArticle">
        <ul className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
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
    </>
  );
}

export default PostArticle;
