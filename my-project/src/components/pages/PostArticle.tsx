import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../templates/PostCard";
import "./Article.css";
import "./App.css";
import Article from "./Article";

type Article = {
  id: number;
  title: string;
  category: string;
  content: string;
  likes: number;
  dislikes: number;
  coverUrl: string;
  images?: string[];
  author_id: number;
  createdAt: string;
  updatedAt: string;
};

function PostArticle() {
  const { id } = useParams<{ id: string }>();
  const [Post, setPost] = useState<Article | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Laden des Posts:", error);
      });
  }, [id]);

  return (
    <>
      <header className="App-header">
        <div className="tabs">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <div className="vline"></div>
          <a className="title" href="http://localhost:3000/">
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

      <main className="PostArticle">
        {Post ? (
          <Article post={Post} />
        ) : (
          <p style={{ textAlign: "center" }}>Post Loading...</p>
        )}
      </main>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="tabs">
            <button className="close" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
            <div className="vline"></div>
            <a className="title" href="http://localhost:3000/"></a>
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
