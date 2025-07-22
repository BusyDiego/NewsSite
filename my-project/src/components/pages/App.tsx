import Homepage from "./Homepage";
import PostArticle from "./PostArticle";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./login";
import LoginService from "./loginService";
import CreatePost from "./CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/post/:id" element={<PostArticle />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
