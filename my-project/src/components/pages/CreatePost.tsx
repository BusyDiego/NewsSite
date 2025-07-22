// src/components/pages/CreatePost.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "./Api";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type NewPost = {
  title: string;
  category: string;
  content: string;
  coverUrl?: string;
  images: string[];
  authorId: number;
};

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Debug log to see user structure
  console.log("User from localStorage:", user);

  // Redirect to login if no user
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [form, setForm] = useState<NewPost>({
    title: "",
    category: "",
    content: "",
    coverUrl: "",
    images: [],
    authorId: 0, // Initialize with 0, will be updated in useEffect
  });
  const [imageInput, setImageInput] = useState<string>("");

  // Update authorId when user is loaded
  React.useEffect(() => {
    if (user && user.id) {
      setForm((prev) => ({ ...prev, authorId: user.id }));
      console.log("Updated authorId to:", user.id);
    }
  }, [user]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setForm((f) => ({ ...f, images: [...f.images, imageInput.trim()] }));
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!form.title || !form.category || !form.content) {
      setError("Fill all fields.");
      return;
    }

    // Check if authorId is valid
    if (!form.authorId || form.authorId === 0) {
      setError("Benutzersitzung abgelaufen. Bitte melden Sie sich erneut an.");
      navigate("/login");
      return;
    }

    try {
      console.log("Submitting form data:", form);
      // Token wird automatisch per interceptor angehängt
      await baseInstance.post("/api/posts", form);
      navigate("/"); // zurück zur Übersicht
    } catch (err: any) {
      console.error("Error creating post:", err);
      console.error("Error response:", err.response);
      if (err.response?.data?.errors) {
        // Handle validation errors from backend
        const errors = Object.values(err.response.data.errors).join(", ");
        setError(errors);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Fehler beim Anlegen des Posts. Bitte versuchen Sie es später erneut."
        );
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">New Post</Typography>

      <TextField
        label="Titel"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        inputProps={{ maxLength: 25 }}
        helperText={`${form.title.length}/25`}
      />

      <TextField
        label="Kategorie"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <TextField
        label="Cover-URL"
        name="coverUrl"
        value={form.coverUrl}
        onChange={handleChange}
      />

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Add more Pictures
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            label="Bild-URL"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddImage();
              }
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            variant="outlined"
            onClick={handleAddImage}
            startIcon={<AddPhotoAlternateIcon />}
          >
            Add
          </Button>
        </Box>

        {form.images.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {form.images.map((image, index) => (
              <Chip
                key={index}
                label={`Bild ${index + 1}`}
                onDelete={() => handleRemoveImage(index)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        )}
      </Box>

      <TextField
        label="Inhalt"
        name="content"
        value={form.content}
        onChange={handleChange}
        required
        multiline
        minRows={6}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ display: "flex", gap: 1 }}>
        <button type="submit">Save</button>
        <button onClick={() => navigate("/")} type="button">
          Cancel
        </button>
      </Box>
    </Box>
  );
};

export default CreatePost;
