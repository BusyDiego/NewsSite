import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import "./Comment.css";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
}

interface Props {
  postId: number;
}

const Comment: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get<Comment[]>(
        `http://localhost:8080/api/comments`
      );
      setComments(response.data);
    } catch (err) {
      setError("Fehler beim Laden der Kommentare.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const commentPayload = {
      content: newComment,
      author: { id: 1 },
      post: { id: postId },
    };

    try {
      await axios.post("http://localhost:8080/api/comments", commentPayload);
      setNewComment("");
      fetchComments(); // neu laden
    } catch (err) {
      setError("Fehler beim Absenden des Kommentars.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <Box sx={{ mt: 4 }}>
      <big>Comments</big>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="New comment"
        />
        <button>Post</button>
      </form>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <div className="comments-list">
        <div className="divider" />
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            {comment.author?.username || "Anonym"} –{" "}
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
            <p>"{comment.content}"</p>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Comment;
