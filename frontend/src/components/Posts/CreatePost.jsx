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
} from "@mui/material";

const CreatePost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(""); // State to handle title
  const [tags, setTags] = useState(""); // State to handle tags

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
        },
        {
          withCredentials:true
        }
      )

      if (response.status === 200 || response.status === 201) {
        console.log("Success");
        alert("article saved succesfully")
        setContent("")
        setTitle("")
        setTags("")
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
    uploader: { insertImageAsBase64URI: true },
    askBeforePasteHTML: false,
    pastePlainText: true,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Add your Article
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Write, format, and publish your content here.
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
          helperText="Add tags separated by commas (e.g., technology, JavaScript, web)"
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

        {/* Tags Input */}

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
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
              "&:hover": { borderColor: "secondary.dark" },
            }}
            onClick={() => savePost("draft")}
          >
            Save as Draft
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px 0",
              fontSize: "16px",
              width: "200px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              boxShadow: 2,
              "&:hover": { backgroundColor: "primary.dark" },
            }}
            onClick={() => savePost("pending")}
          >
            Sent to reveiw
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;