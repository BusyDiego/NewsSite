import Homepage from "./Homepage";
import PostArticle from "./PostArticle";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./login";
import LoginService from "./loginService";
import CreatePost from "./CreatePost";
import Account from "./Account";
import Register from "./Register";
import Bookmarks from "./Bookmarks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/post/:id" element={<PostArticle />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/account" element={<Account />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
