import React, { useState, useEffect } from "react";
import "./PostCard.css";
import axios from "axios";
import BookmarkService from "../pages/bookmarkService";

export type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  author_id: number;
  likes: number;
  dislikes: number;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  post: Post;
};

export default function PostCard({ post }: { post: Post }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if post is bookmarked on component mount
    const checkBookmark = async () => {
      const bookmarked = await BookmarkService().isBookmarked(post.id);
      setIsBookmarked(bookmarked);
    };
    checkBookmark();
  }, [post.id]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking bookmark
    e.stopPropagation();
    
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to bookmark posts");
      return;
    }

    setIsLoading(true);
    try {
      await BookmarkService().toggleBookmark(post.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ul className="post-card">
      <img src={post.coverUrl} alt={post.title} className="post-cover" />

      <div className="post-infos">
        <div className="post-category">
          <small>{post.category}</small>
        </div>
        <big>{post.title}</big>
      </div>

      <div className="post-meta">
        <div className="comments">☲</div>
        <div className="likes">{post.likes}</div> /{" "}
        <div className="dislikes">{post.dislikes}</div>
        <div 
          className={`bookmark ${isBookmarked ? 'bookmarked' : ''} ${isLoading ? 'loading' : ''}`}
          onClick={handleBookmarkClick}
        >
          {isBookmarked ? '★' : '☆'}
        </div>
      </div>
    </ul>
  );
}
