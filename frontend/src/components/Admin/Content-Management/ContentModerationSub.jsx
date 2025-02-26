import React, { useState , useEffect} from 'react';
// import { Button, Card, CardContent, Typography, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { MoreVert, CheckCircle, Flag, PendingActions, Delete } from '@mui/icons-material';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Card, CardContent } from '@mui/material';

import { Pie, Bar } from 'react-chartjs-2';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPendingPosts, updatePostStatusAPI, deletePostAPI } from "../../../APIServices/posts/postsAPI";

// Styled Components
const StatusCard = styled(Card)(({ status }) => ({
  background: status === "Active"
  ? "linear-gradient(135deg,rgb(255, 255, 255)) 30%, #ddd 90%)"
  : status === "Pending"
  ? "linear-gradient(135deg,rgb(255, 255, 255)) 30%, #ddd 90%)"
  : status === "Flagged"
  ? "linear-gradient(135deg,rgb(255, 255, 255)) 30%, #ddd 90%)"
  : "linear-gradient(135deg,rgb(255, 255, 255)) 30%, #ddd 90%)"
  ,

  color: "black",
  textAlign: "center",
  width: 160,
  height: 110,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  borderRadius: "12px",
  transition: "all 0.4s ease-in-out",
  boxShadow: "0 4px 12px rgba(29, 26, 26, 0.79)",

  "&:hover": {
    transform: "scale(1.08) rotate(2deg)",
    boxShadow: "0 8px 20px rgb(63, 60, 60)",
  },

  


}));



const ContentPart = () => {
    const queryClient = useQueryClient();
  
    const { data: posts = [], isLoading, isError } = useQuery({
      queryKey: ['pendingPosts'],
      queryFn: fetchPendingPosts,
    });
    console.log("Fetched posts:", posts, "Type:", typeof posts, "Is Array:", Array.isArray(posts.posts));

    // const chartData = {
    //     labels: ['Active', 'Pending'],
    //     datasets: [
    //       {
    //         label: 'Content Status',
    //         data: [
    //           posts.posts.filter(item => item.status === 'approved').length,
    //           posts.posts.filter(item => item.status === 'pending').length,
    //         ],
    //         backgroundColor: ['#4caf50', '#1976d2'],
    //       },
    //     ],
    //   };
  
    const updateStatusMutation = useMutation({
      mutationFn: ({ postId, status }) => updatePostStatusAPI(postId, status),
      onSuccess: () => queryClient.invalidateQueries(['pendingPosts']),
    });
  
    const deleteMutation = useMutation({
      mutationFn: (postId) => deletePostAPI(postId),
      onSuccess: () => queryClient.invalidateQueries(['pendingPosts']),
    });
  
    const [disabledButtons, setDisabledButtons] = useState({});
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    const handleStatusChange = (id, status) => {
      updateStatusMutation.mutate({ postId: id, status });
      setDisabledButtons((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setDisabledButtons((prev) => ({ ...prev, [id]: false }));
      }, 5 * 60 * 1000); // Disable for 5 minutes
    };
  
    const handleOpenModal = (post) => {
      setSelectedPost(post);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setSelectedPost(null);
      setModalOpen(false);
    };
  
    if (isLoading) return <p>Loading pending posts...</p>;
    if (isError) return <p>Error loading posts</p>;
  
    return (
      <div className="content-moderation">
        <div className="status-cards" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {['Active', 'Pending'].map((status, index) => (
            <Box key={index} sx={{ p: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff', textAlign: 'center' }}>
              <Typography variant="h6">{status}</Typography>
              <Typography variant="body2">{posts.posts.filter(item => item.status === status).length}</Typography>
            </Box>
          ))}
        </div>
  
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
              {posts.posts.map((item, index) => (
                <TableRow key={item._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt="Post Image"
                      sx={{ width: 80, height: 50, cursor: 'pointer', borderRadius: 1 }}
                      onClick={() => handleOpenModal(item)}
                    />
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: 'none', fontWeight: 'bold' }}
                      disabled={disabledButtons[item._id]}
                      color={item.status === 'Pending' ? 'error' : item.status === 'Approved' ? 'success' : 'secondary'}
                      onClick={() => handleStatusChange(item._id, item.status === 'Pending' ? 'Approved' : 'Pending')}
                    >
                      {item.status === 'Pending' ? (
                        <>
                          <CheckCircle sx={{ marginRight: 1, fontSize: 18 }} /> Approve
                        </>
                      ) : (
                        <>
                          <PendingActions sx={{ marginRight: 1, fontSize: 18 }} /> Mark Pending
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Post Details</DialogTitle>
          <DialogContent>
            {selectedPost && (
              <Box>
                <Box component="img" src={selectedPost.imageUrl} alt="Post" sx={{ width: '100%', borderRadius: 1 }} />
                <Typography variant="body1" sx={{ mt: 2 }}>{selectedPost.description}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

      <Box
      sx={{
        marginBottom: 4,
        background: "#fff", // White background
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#111",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Content Analytics
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          width: "100%",
        }}
      >
        {/* Pie Chart */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, 
            height: "300px", // Fixed height for consistency
            background: "#f9f9f9", // Light gray for visibility
            borderRadius: "12px",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {/* <Pie data={chartData} /> */}
        </Box>

        {/* Bar Chart */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, // Same width as Pie Chart
            height: "300px", // Same height for consistency
            background: "#f9f9f9", // Light gray for visibility
            borderRadius: "12px",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {/* <Bar data={monthData} /> */}
        </Box>
      </Box>
    </Box>
    
    </div>
  );
};

export default ContentPart;
