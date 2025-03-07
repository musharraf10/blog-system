import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
} from "@mui/material";

const UpdateNewPost = () => {
  const { id } = useParams(); // Extract post ID from URL
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");

  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  // Fetch existing post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BackendServername}/managecontent/getpost/${id}`);
        const post = response.data;

        // Set form values
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(", "));
        setPrice(post.price || "");
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to load post details.");
      }
    };

    fetchPost();
  }, [id]);

  // Update the existing post
  const updatePost = async () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("Title and content cannot be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `${BackendServername}/posts/update/${id}`,
        {
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          price,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Post updated successfully!");
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update content. Please try again.");
    }
  };

  const config = {
    readonly: false,
    toolbarAdaptive: false,
    height: 500,
    width: "100%",
    pastePlainText: true,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Edit Post
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Modify your content and save changes.
          </Typography>
        </Box>

        {/* Title Input */}
        <TextField
          label="Post Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Tags (separate with commas)"
          variant="outlined"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Editor */}
        <Box sx={{ mb: 4 }}>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            className="w-full"
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={updatePost}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateNewPost;
