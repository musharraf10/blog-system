import React, { useState } from 'react';
import {
  Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Box,
  Menu, MenuItem
} from '@mui/material';
import { MoreVert, CheckCircle, PendingActions } from '@mui/icons-material';
import { Pie, Bar } from 'react-chartjs-2';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPendingPosts, updatePostStatusAPI, deletePostAPI, fetchPostAnalytics } from "../../../APIServices/posts/postsAPI";

// Content Management Component
const ContentPart = () => {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For three dots menu
  const [selectedPostId, setSelectedPostId] = useState(null); // For delete action

  // Fetch Pending Posts
  const { data: postsData, isLoading, isError } = useQuery({
    queryKey: ['pendingPosts'],
    queryFn: fetchPendingPosts,
  });

  // Fetch Analytics
  const { data: analyticsData = {} } = useQuery({
    queryKey: ['postAnalytics'],
    queryFn: fetchPostAnalytics,
  });

  // Update Post Status
  const updateStatusMutation = useMutation({
    mutationFn: (data) => updatePostStatusAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingPosts']);
      queryClient.invalidateQueries(['postAnalytics']);
    },
    onError: (error) => {
      console.error("Error updating post status:", error);
    },
  });

  // Delete Post
  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePostAPI(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingPosts']);
      queryClient.invalidateQueries(['postAnalytics']);
    },
  });

  // Handle Post Status Change
  const handleStatusChange = (id, status) => {
    console.log("Updating post:",id, "to status:", status);
    updateStatusMutation.mutate({ postId : id , status });
  };
  // Handle Delete Post
  const handleDeletePost = (id) => {
    deleteMutation.mutate(id);
    setAnchorEl(null); // Close the menu
  };

  // Handle Three Dots Menu
  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  // Handle Modal Open/Close
  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  if (isLoading) return <p>Loading pending posts...</p>;
  if (isError) return <p>Error loading posts.</p>;

  const posts = postsData?.posts || [];

  // Status Count Data
  const statusCounts = {
    Approved: posts.filter(post => post.status === 'approved').length || 0,
    Pending: posts.filter(post => post.status === 'pending').length || 0,
    Rejected: posts.filter(post => post.status === 'rejected').length || 0,
  };

  // Chart Data
  const chartData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Post Status',
        data: [statusCounts.Approved, statusCounts.Pending, statusCounts.Rejected],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  const monthData = {
    labels: ['This Month', 'Last Month'],
    datasets: [
      {
        label: 'Posts',
        data: [analyticsData.thisMonth || 0, analyticsData.lastMonth || 0],
        backgroundColor: ['#1976d2', '#4caf50'],
      },
    ],
  };

  return (
    <div className="content-management">
      {/* Status Cards */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {['approved', 'pending', 'rejected'].map((status, index) => (
          <Box key={index} sx={{ p: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff', textAlign: 'center' }}>
            <Typography variant="h6">{status}</Typography>
            <Typography variant="body2">{statusCounts[status]}</Typography>
          </Box>
        ))}
      </div>

      {/* Posts Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{post._id}</TableCell>
                <TableCell>{post.author || "N/A"}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={post.image}
                    alt="Post Image"
                    sx={{ width: 80, height: 50, cursor: 'pointer', borderRadius: 1 }}
                    onClick={() => handleOpenModal(post)}
                  />
                </TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, post._id)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedPostId === post._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleDeletePost(post._id)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
                <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  color={
                    post.status === 'pending' ? 'warning' :
                    post.status === 'approved' ? 'success' :
                    'error'
                  }
                  onClick={() => handleStatusChange(post._id, post.status === 'pending' ? 'approved' : 'rejected')}
                >
                  {post.status === 'pending' ? (
                    <>
                      <CheckCircle sx={{ marginRight: 1, fontSize: 18 }} /> Approve
                    </>
                  ) : (
                    <>
                      <PendingActions sx={{ marginRight: 1, fontSize: 18 }} /> Reject
                    </>
                  )}
                </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Post Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent>
          {selectedPost && (
            <Box>
              <Box component="img" src={selectedPost.image} alt="Post" sx={{ width: '100%', borderRadius: 1 }} />
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedPost.description}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContentPart;