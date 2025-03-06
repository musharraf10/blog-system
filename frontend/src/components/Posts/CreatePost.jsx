import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
  Divider,
  Stack,
} from "@mui/material";

const CreatePost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(""); 
  const [tags, setTags] = useState(""); 
  const [price, setPrice] = useState(""); 

  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const savePost = async (postStatus) => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("Title and content cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        `${BackendServername}/article/addarticle`,
        {
          title,
          content,
          status: postStatus,
          tags: tags.split(",").map((tag) => tag.trim()),
          price
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Success");
        alert("Article saved successfully");
        setContent("");
        setTitle("");
        setTags("");
        setPrice("");
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert(
        "Failed to save content. Please check your connection and try again."
      );
    }
  };

  const config = {
    readonly: false,
    toolbarAdaptive: false,
    height: 500,
    width: "100%",
    // uploader: { insertImageAsBase64URI: true },
    askBeforePasteHTML: false,
    pastePlainText: true,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Add Your Article
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Write, format, and publish your content here.
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Stack spacing={3}>
          {/* Title Input */}
          <TextField
            label="Post Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Tags Input */}
          <TextField
            label="Tags (separate with commas)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Price Input */}
          <TextField
            label="Add Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Editor */}
          <Box sx={{ mb: 4 }}>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
            />
          </Box>
        </Stack>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              padding: "12px 0",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              width: "200px",
              gap: 1,
              borderColor: "secondary.main",
              boxShadow: 2,
              "&:hover": { borderColor: " #1E3A8A" },
              color: "black"
            }}
            onClick={() => savePost("draft")}
          >
            Save as Draft
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              background: "linear-gradient(to right, #1E3A8A, #3B82F6)",
              color: "white",
              padding: "12px 0",
              fontSize: "16px",
              width: "200px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              boxShadow: 2,
              "&:hover": {
                background: "linear-gradient(to right, #1E40AF, #2563EB)",
                color: "black"
              },
            }}
            onClick={() => savePost("pending")}
          >
            Send to Review
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;
