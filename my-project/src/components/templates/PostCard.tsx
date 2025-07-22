import React from "react";
import "./PostCard.css";
import axios from "axios";

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
        <div className="bookmark">☆</div>
      </div>
    </ul>
  );
}
