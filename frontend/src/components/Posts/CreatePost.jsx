
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaTimesCircle, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';
import AlertMessage from '../Alert/AlertMessage';
import { fetchCategoriesAPI } from '../../APIServices/category/categoryAPI';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [imageError, setImageErr] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Post mutation
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI,
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      description: '',
      image: '',
      category: '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      image: Yup.string().required('Image is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('image', values.image);
      formData.append('category', values.category);
      postMutation.mutate(formData);
    },
  });

  // Fetch categories
  const { data } = useQuery({
    queryKey: ['category-lists'],
    queryFn: fetchCategoriesAPI,
  });

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.size > 1048576) {
      setImageErr('File size exceeds 1MB');
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImageErr('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
      return;
    }
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
    setImageErr('');
  };

  // Remove image
  const removeImage = () => {
    formik.setFieldValue('image', null);
    setImagePreview(null);
  };

  // Mutation states
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const errorMsg = postMutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create a New Post
        </h2>

        {/* Alert Messages */}
        {isLoading && (
          <AlertMessage
            type="loading"
            message={
              <div className="flex items-center gap-2">
                <FaSpinner className="animate-spin" /> Loading, please wait...
              </div>
            }
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Post created successfully!" />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue('description', value);
              }}
              placeholder="Write your post content here..."
              className="h-48 mb-2"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select
              name="category"
              options={data?.categories?.map((category) => ({
                value: category._id,
                label: category.categoryName,
              }))}
              onChange={(option) =>
                formik.setFieldValue('category', option.value)
              }
              value={data?.categories?.find(
                (option) => option.value === formik.values.category,
              )}
              placeholder="Select a category"
              className="mt-1"
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              id="images"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Choose a file
            </label>
            <p className="text-sm text-gray-500 mt-2">
              JPEG, JPG, or PNG (Max 1MB)
            </p>
            {imageError && (
              <p className="text-sm text-red-600 mt-2">{imageError}</p>
            )}
            {imagePreview && (
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition-colors"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Creating Post...
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
=======
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, Grid, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme, Chip, IconButton, InputAdornment } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({ clip: "rect(0 0 0 0)", clipPath: "inset(50%)", height: 1, overflow: "hidden", position: "absolute", bottom: 0, left: 0, whiteSpace: "nowrap", width: 1 });
const StyledTabButton = styled(Button)(({ theme, active }) => ({
    textTransform: "capitalize", fontSize: "16px", fontWeight: "bold", borderRadius: theme.spacing(1), padding: theme.spacing(1, 3), transition: "all 0.3s ease",
    ...(active ? { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, "&:hover": { backgroundColor: theme.palette.primary.dark } }
        : { borderColor: theme.palette.primary.main, color: theme.palette.primary.main, "&:hover": { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText } })
}));
const ContentPaper = styled(Paper)(({ theme }) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2), boxShadow: theme.shadows[4], backgroundColor: theme.palette.background.paper, [theme.breakpoints.down("sm")]: { padding: theme.spacing(2) } }));

const ContentManager = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeTab, setActiveTab] = useState(null);
    const [scheduling, setScheduling] = useState("no");
    const [content, setContent] = useState({ title: "", description: "", image: null, videoFile: null, startTime: "", endTime: "", hashtags: [] });
    const [hashtagInput, setHashtagInput] = useState("");

    const handleTabChange = (tab) => { setActiveTab(activeTab === tab ? null : tab); setScheduling("no"); setContent({ title: "", description: "", image: null, videoFile: null, startTime: "", endTime: "", hashtags: [] }); };
    const handleInputChange = (e) => { const { name, value, files } = e.target; setContent((prevState) => ({ ...prevState, [name]: files ? files[0] : value })); };
    const handleAddHashtag = () => { if (hashtagInput.trim() && !content.hashtags.includes(hashtagInput.trim())) { setContent((prevState) => ({ ...prevState, hashtags: [...prevState.hashtags, hashtagInput.trim()] })); setHashtagInput(""); } };
    const handleRemoveHashtag = (hashtag) => { setContent((prevState) => ({ ...prevState, hashtags: prevState.hashtags.filter((tag) => tag !== hashtag) })); };
    const handleRemoveAllHashtags = () => { setContent((prevState) => ({ ...prevState, hashtags: [] })); };
    const handleClearHashtagInput = () => { setHashtagInput(""); };

    const renderUploadedFile = () => {
        if (content.image) {
            return (
                <Box sx={{ mt: 2, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: isMobile ? "200px" : "300px" }}>
                    <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.primary }}>Uploaded Image:</Typography>
                    <img src={URL.createObjectURL(content.image)} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: theme.spacing(1), objectFit: "contain" }} />
                </Box>
            );
        } else if (content.videoFile) {
            return (
                <Box sx={{ mt: 2, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: isMobile ? "200px" : "300px" }}>
                    <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.primary }}>Uploaded Video:</Typography>
                    <video controls style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: theme.spacing(1), objectFit: "contain" }}>
                        <source src={URL.createObjectURL(content.videoFile)} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            );
        }
        return null;
    };

    const handlePublish = () => {
        if (!content.title || !content.description || (activeTab !== "webinar" && !content.image && !content.videoFile)) {
            alert("Please fill all the required fields before publishing or scheduling.");
            return;
        }
        if (scheduling === "yes" && (!content.startTime || !content.endTime)) {
            alert("Please provide both start and end times for scheduling.");
            return;
        }
        alert(scheduling === "yes" ? "Content successfully scheduled!" : "Content successfully published!");
        setContent({ title: "", description: "", image: null, videoFile: null, startTime: "", endTime: "", hashtags: [] });
        setScheduling("no");
        setActiveTab(null);
    };

    return (
        <Container maxWidth="100%" sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 }, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3, boxShadow: 3, backgroundColor: theme.palette.background.default, flexGrow: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: theme.palette.text.primary }}>Content Creation</Typography>
                <Box sx={{ mb: 3, display: "flex", justifyContent: "center", gap: { xs: 1, sm: 2 }, flexWrap: { xs: "wrap", md: "nowrap" } }}>
                    {["articles", "videos", "webinar", "tutorial"].map((tab) => (
                        <StyledTabButton key={tab} variant={activeTab === tab ? "contained" : "outlined"} onClick={() => handleTabChange(tab)} active={activeTab === tab ? 1 : 0} sx={{ minWidth: { xs: '110px', sm: '120px' }, mb: { xs: 1, md: 0 } }}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </StyledTabButton>
                    ))}
                </Box>
                {activeTab && (
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ flexGrow: 1, alignItems: "stretch" }}>
                        <Grid item xs={12} md={6}>
                            <ContentPaper sx={{ height: "100%" }}>
                                <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: theme.palette.text.primary }}>
                                    {activeTab === "articles" ? "Create New Article" : "Upload New Content"}
                                </Typography>
                                <TextField fullWidth label="Title" name="title" value={content.title} onChange={handleInputChange} margin="normal" variant="outlined" sx={{ mb: 2 }} />
                                <TextField fullWidth label="Description" name="description" value={content.description} onChange={handleInputChange} margin="normal" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />
                                <Box sx={{ mb: 2 }}>
                                    <TextField fullWidth label="Enter Hashtags" value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} margin="normal" variant="outlined" onKeyPress={(e) => { if (e.key === "Enter") handleAddHashtag(); }} InputProps={{ endAdornment: hashtagInput && (<InputAdornment position="end"><IconButton aria-label="clear hashtag input" onClick={handleClearHashtagInput} edge="end"><ClearIcon /></IconButton></InputAdornment>) }} />
                                    <Button variant="contained" onClick={handleAddHashtag} sx={{ mt: 1, width: { xs: '100%', sm: 'auto' } }}>Add Hashtag</Button>
                                </Box>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, alignItems: "center" }}>
                                    {content.hashtags.map((hashtag, index) => (<Chip key={index} label={`#${hashtag}`} onDelete={() => handleRemoveHashtag(hashtag)} sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }} />))}
                                    {content.hashtags.length > 0 && (<IconButton onClick={handleRemoveAllHashtags} color="error" size="small" sx={{ ml: 1 }}><DeleteIcon /></IconButton>)}
                                </Box>
                                {activeTab !== "webinar" && (
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2, width: { xs: '100%', sm: 'auto' } }}>
                                        Upload File
                                        <VisuallyHiddenInput type="file" name={activeTab === "videos" ? "videoFile" : "image"} onChange={handleInputChange} accept={activeTab === "videos" ? "video/*" : "image/*"} />
                                    </Button>
                                )}
                                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: theme.palette.text.primary }}>Schedule Content?</Typography>
                                <ToggleButtonGroup color="primary" value={scheduling} exclusive onChange={(e, newValue) => setScheduling(newValue || "no")} sx={{ mb: 2, display: 'flex', width: { xs: '100%', sm: 'auto' } }}>
                                    <ToggleButton value="yes" sx={{ flex: { xs: 1, sm: 'none' }, py: 1 }}>Yes</ToggleButton>
                                    <ToggleButton value="no" sx={{ flex: { xs: 1, sm: 'none' }, py: 1 }}>No</ToggleButton>
                                </ToggleButtonGroup>
                                {scheduling === "yes" && (
                                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Start Time" name="startTime" type="datetime-local" value={content.startTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="End Time" name="endTime" type="datetime-local" value={content.endTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} variant="outlined" />
                                        </Grid>
                                    </Grid>
                                )}
                                <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: 2, width: { xs: '100%', sm: 'auto' } }} onClick={handlePublish}>
                                    {scheduling === "yes" ? `Schedule ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` : "Publish"}
                                </Button>
                            </ContentPaper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ContentPaper sx={{ height: "100%" }}>
                                <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: theme.palette.text.primary }}>Preview</Typography>
                                <Typography variant="h6" sx={{ mt: 2, color: theme.palette.text.primary }}>Title:</Typography>
                                <Typography sx={{ mb: 2, color: theme.palette.text.secondary }}>{content.title || "N/A"}</Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>Description:</Typography>
                                <Typography sx={{ mb: 2, color: theme.palette.text.secondary }}>{content.description || "N/A"}</Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>Hashtags:</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, alignItems: "center" }}>
                                    {content.hashtags.map((hashtag, index) => (<Chip key={index} label={`#${hashtag}`} sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }} />))}
                                    {content.hashtags.length > 0 && (<IconButton onClick={handleRemoveAllHashtags} color="error" size="small" sx={{ ml: 1 }}><DeleteIcon /></IconButton>)}
                                </Box>
                                {renderUploadedFile()}
                            </ContentPaper>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Container>
    );

};

export default ContentManager;