import React from "react";
import "./Article.css";
import CommentSection from "../templates/Comment";
import ImageCarousel from "../organisms/ImageCarousel";
import axios from "axios";

export type Article = {
  id: number;
  title: string;
  category: string;
  content: string;
  author_id: number;
  likes: number;
  dislikes: number;
  coverUrl: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
};

type Props = {
  post: Article;
};

export default function PostCard({ post }: { post: Article }) {
  const handleLike = () => {
    axios
      .post(`http://localhost:8080/api/posts/${post.id}/like`)
      .then(() => window.location.reload()); // ODER post.likes++ und setState
  };

  const handleDislike = () => {
    axios
      .post(`http://localhost:8080/api/posts/${post.id}/dislike`)
      .then(() => window.location.reload());
  };

  return (
    <div className="Aticle">
      <div className="Back">
        <a href="/">ᐊ</a>
      </div>
      <ImageCarousel 
        images={post.images || []} 
        coverUrl={post.coverUrl} 
        title={post.title} 
      />
      <div className="Article-infos">
        <div className="Article-category">
          <small>{post.category}</small>
        </div>
        <big>{post.title}</big>
      </div>
      <div className="Article-meta">
        <div className="comments">☲</div>
        <div className="likes" onClick={handleLike}>
          {post.likes}{" "}
        </div>
        /{" "}
        <div className="dislikes" onClick={handleDislike}>
          {post.dislikes}
        </div>
        <div className="bookmark">☆</div>
      </div>
      <div className="Article-author">
        <small>Author ID: {post.author_id}</small>
        <div className="date">
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
      <div className="Article-content">
        <p>{post.content}</p>
      </div>
      <div className="Article-footer">
        <small>
          Last updated: {new Date(post.updatedAt).toLocaleDateString()}
        </small>
      </div>
      <div className="Article-comments">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
