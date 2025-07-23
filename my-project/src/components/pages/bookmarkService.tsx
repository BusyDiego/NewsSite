import type { AxiosInstance } from "axios";
import { baseInstance } from "./Api";

interface Bookmark {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
}

const BookmarkService = (api: AxiosInstance = baseInstance) => ({
  // Get all bookmarks for the current user
  getBookmarks: async () => {
    try {
      const response = await api.get("/api/bookmarks");
      return response.data;
    } catch (error) {
      // Fallback to localStorage if API is not available
      const bookmarks = localStorage.getItem("bookmarks");
      return bookmarks ? JSON.parse(bookmarks) : [];
    }
  },

  // Check if a post is bookmarked
  isBookmarked: async (postId: number) => {
    try {
      const response = await api.get(`/api/bookmarks/post/${postId}`);
      return response.data.isBookmarked;
    } catch (error) {
      // Fallback to localStorage
      const bookmarks = localStorage.getItem("bookmarks");
      const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
      return bookmarkList.includes(postId);
    }
  },

  // Add a bookmark
  addBookmark: async (postId: number) => {
    try {
      const response = await api.post("/api/bookmarks", { postId });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const bookmarks = localStorage.getItem("bookmarks");
      const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
      if (!bookmarkList.includes(postId)) {
        bookmarkList.push(postId);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
      }
      return { postId, success: true };
    }
  },

  // Remove a bookmark
  removeBookmark: async (postId: number) => {
    try {
      const response = await api.delete(`/api/bookmarks/post/${postId}`);
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const bookmarks = localStorage.getItem("bookmarks");
      const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
      const filtered = bookmarkList.filter((id: number) => id !== postId);
      localStorage.setItem("bookmarks", JSON.stringify(filtered));
      return { postId, success: true };
    }
  },

  // Toggle bookmark status
  toggleBookmark: async (postId: number) => {
    const isBookmarked = await BookmarkService().isBookmarked(postId);
    if (isBookmarked) {
      return await BookmarkService().removeBookmark(postId);
    } else {
      return await BookmarkService().addBookmark(postId);
    }
  },
});

export default BookmarkService;