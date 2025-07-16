import Homepage from "./Homepage";
import PostArticle from "./PostArticle";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/post/:id" element={<PostArticle />} />
    </Routes>
  );
}

export default App;
