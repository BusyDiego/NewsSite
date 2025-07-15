import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../../assets/logo.svg"; // Assuming you have a logo.svg in the assets folder
import axios from "axios"; // Typ definieren

type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  likes: number;
  dislikes: number;
  coverUrl: string; // <- NEU
};
// useState richtig typisieren
const [get, setGet] = useState<Post[]>([]);
