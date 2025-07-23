import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseInstance } from "../pages/Api";
import "./Comment.css";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username?: string;
    email?: string;
  };
  post: {
    id: number;
  };
}

interface Props {
  postId: number;
}

const Comment: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await axios.get<Comment[]>(
        `http://localhost:8080/api/posts/${postId}/comments`
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      // Fallback: try to get all comments and filter
      try {
        const allComments = await axios.get<Comment[]>(
          `http://localhost:8080/api/comments`
        );
        const postComments = allComments.data.filter(
          comment => comment.post?.id === postId
        );
        setComments(postComments);
      } catch (fallbackErr) {
        setError("Failed to load comments.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");
    
    if (!token || !userStr) {
      setError("Please login to comment.");
      return;
    }

    const user = JSON.parse(userStr);
    
    const commentPayload = {
      content: newComment.trim(),
      author: { id: user.id },
      post: { id: postId },
    };

    setLoading(true);
    setError(null);

    try {
      await baseInstance.post("/api/comments", commentPayload);
      setNewComment("");
      fetchComments();
    } catch (err: any) {
      console.error("Error posting comment:", err);
      if (err.response?.status === 401) {
        setError("Please login to comment.");
      } else {
        setError("Failed to post comment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const token = localStorage.getItem("accessToken");

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      
      {token ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !newComment.trim()}>
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Please <a href="/login">login</a> to comment.</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.author?.username || comment.author?.email || "Anonymous"}
                </span>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
