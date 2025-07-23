import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BookmarkService from "./bookmarkService";
import PostCard from "../templates/PostCard";
import "./Bookmarks.css";

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

const Bookmarks: React.FC = () => {
  const navigate = useNavigate();
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchBookmarkedPosts();
  }, [navigate]);

  const fetchBookmarkedPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get bookmark IDs
      const bookmarkIds = await BookmarkService().getBookmarks();
      
      if (bookmarkIds.length === 0) {
        setBookmarkedPosts([]);
        setLoading(false);
        return;
      }

      // Fetch all posts
      const response = await axios.get("http://localhost:8080/api/posts");
      const allPosts = response.data;
      
      // Filter to get only bookmarked posts
      const bookmarked = allPosts.filter((post: Post) => 
        bookmarkIds.includes(post.id)
      );
      
      setBookmarkedPosts(bookmarked);
    } catch (error) {
      console.error("Error fetching bookmarked posts:", error);
      setError("Failed to load bookmarked posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookmarks-container">
      <div className="bookmarks-header">
        <h1>My Bookmarks</h1>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <div className="bookmarks-content">
        {loading && <div className="loading-message">Loading bookmarks...</div>}
        
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && bookmarkedPosts.length === 0 && (
          <div className="empty-bookmarks">
            <p>You haven't bookmarked any posts yet.</p>
            <Link to="/" className="browse-link">Browse Posts</Link>
          </div>
        )}
        
        {!loading && !error && bookmarkedPosts.length > 0 && (
          <div className="bookmarked-posts">
            {bookmarkedPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;