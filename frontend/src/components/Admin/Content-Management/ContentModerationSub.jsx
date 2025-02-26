import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { MoreVert, CheckCircle, Flag, PendingActions, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Pie, Bar } from 'react-chartjs-2';

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
    // background: status === "Active"
    //   ? "linear-gradient(135deg, #555 30%, #777 90%)"
    //   : status === "Pending"
    //   ? "linear-gradient(135deg, #555 30%, #777 90%)"
    //   : status === "Flagged"
    //   ? "linear-gradient(135deg, #555 30%, #777 90%)"
    //   : "linear-gradient(135deg, #555 30%, #777 90%)",
  },

  


}));



const ContentPart = () => {
  const [content, setContent] = useState([
    { id: 1, userId: '101', userName: 'John Doe', title: 'Sample content 1', description: 'This is a sample content', image: `https://picsum.photos/100?random=${Math.floor(Math.random() * 1000)}`, video: 'https://www.w3schools.com/html/movie.mp4', status: 'Pending', flagged: false, views: 100, likes: 10, dislikes: 2, comments: 5 },
    { id: 2, userId: '102', userName: 'Jane Doe', title: 'Sample content 2', description: 'This is another sample content', image: `https://picsum.photos/100?random=${Math.floor(Math.random() * 1000)}`, video: 'https://www.w3schools.com/html/movie.mp4', status: 'Flagged', flagged: true, views: 200, likes: 15, dislikes: 3, comments: 8 },
    { id: 3, userId: '103', userName: 'Alice', title: 'Inappropriate content', description: 'This content is inappropriate', image: `https://picsum.photos/100?random=${Math.floor(Math.random() * 1000)}`, video: 'https://www.w3schools.com/html/movie.mp4', status: 'Active', flagged: false, views: 300, likes: 20, dislikes: 5, comments: 10 },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState({ type: '', url: '' });

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOpen = (type, url) => {
    setSelectedMedia({ type, url });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (id, status) => {
    setContent(content.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const chartData = {
    labels: ['Active', 'Pending', 'Flagged', 'Removed'],
    datasets: [
      {
        label: 'Content Status',
        data: [
          content.filter(item => item.status === 'Active').length,
          content.filter(item => item.status === 'Pending').length,
          content.filter(item => item.status === 'Flagged').length,
          content.filter(item => item.status === 'Removed').length,
        ],
        backgroundColor: ['#4caf50', '#1976d2', '#ffeb3b', '#f44336'],
      },
    ],
  };

  const monthData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Content Published per Month',
        data: [3, 4, 1, 2, 5, 0, 3, 2, 4, 3, 1, 2], // dummy data for now
        backgroundColor: '#1976d2',
      },
    ],
  };

  return (
    <div className="content-moderation">
      <div className="status-cards" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {['Active', 'Pending', 'Flagged', 'Removed','Newpost'].map((status, index) => (
          <StatusCard key={index} status={status}>
            <CardContent>
              <Typography variant="h6">{status}</Typography>
              <Typography variant="body2">{content.filter(item => item.status === status).length}</Typography>
            </CardContent>
          </StatusCard>
        ))}
      </div>

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
          <Pie data={chartData} />
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
          <Bar data={monthData} />
        </Box>
      </Box>
    </Box>
    
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden",marginBottom:4 }}>
  <Table sx={{ minWidth: 750 }} aria-label="content table">
    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>S.no</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>User Id</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Post</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {content.map((item, index) => (
        <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.userId}</TableCell>
          <TableCell>{item.userName}</TableCell>
          <TableCell>
            <Box
              component="img"
              src={item.imageUrl}
              alt="Post Image"
              sx={{ width: 80, height: 50, cursor: "pointer", borderRadius: 1 }}
              onClick={() => handleOpen("post", item)}
            />
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { handleStatusChange(item.id, "Flagged"); handleMenuClose(); }}>
                <Flag sx={{ marginRight: 1 }} /> Flag
              </MenuItem>
              <MenuItem onClick={() => { handleStatusChange(item.id, "Removed"); handleMenuClose(); }}>
                <Delete sx={{ marginRight: 1 }} /> Remove
              </MenuItem>
            </Menu>
          </TableCell>
          <TableCell>
            {item.status === "Pending" ? (
              <Button 
                variant="contained" 
                color="success" 
                size="small" 
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={() => handleStatusChange(item.id, "Active")}
              >
                <CheckCircle sx={{ marginRight: 1, fontSize: 18 }} /> Approve
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="error" 
                size="small" 
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={() => handleStatusChange(item.id, "Pending")}
              >
                <PendingActions sx={{ marginRight: 1, fontSize: 18 }} /> Pending
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Post Details</DialogTitle>
  <DialogContent sx={{ padding: 3 }}>
    <Box display="flex" justifyContent="center">
      <Box
        component="img"
        src={selectedMedia.imageUrl}
        alt="Post Image"
        sx={{ width: "100%", maxHeight: 300, borderRadius: 2 }}
      />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>{selectedMedia.title}</Typography>
    <Typography variant="body1" sx={{ marginBottom: 2 }}>{selectedMedia.description}</Typography>
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <Typography variant="body2"><strong>Views:</strong> {selectedMedia.views}</Typography>
      <Typography variant="body2"><strong>Likes:</strong> {selectedMedia.likes}</Typography>
      <Typography variant="body2"><strong>Dislikes:</strong> {selectedMedia.dislikes}</Typography>
      <Typography variant="body2"><strong>Comments:</strong> {selectedMedia.comments}</Typography>
    </Box>
  </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContentPart;
//manikanta