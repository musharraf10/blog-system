import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Grid,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete, Close, Refresh, Person, FilterList } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';


const UserManagementTable = () => {
  const [users, setUsers] = useState();
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/users/getallusers',
      );
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
      showSnackbar('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Snackbar Handler
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  // Edit Handler
  const handleEditClick = (user) => {
    setEditUser({ ...user });
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };
  

  const handleSaveEdit = async () => {
    if (!editUser) return;
    
    try {
      await axios.put(
        `http://localhost:5000/api/v1/users/update-user/${editUser._id}`,
        editUser,
      );
      setUsers(
        users.map((user) => (user._id === editUser._id ? editUser : user)),
      );
      setOpenEdit(false);
      showSnackbar('User updated successfully.');
    } catch (error) {
      console.error('Failed to update user:', error);
      showSnackbar('Failed to update user.');
    }
  };

  // Delete Handler
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/users/delete-user/${userId}`,
      );
      setUsers(users.filter((user) => user._id !== userId));
      showSnackbar('User deleted successfully.');
    } catch (error) {
      console.error('Failed to delete user:', error);
      showSnackbar('Failed to delete user.');
    }
  };

  // Filter Logic
  const filteredUsers =
    filterRole === 'All'
      ? users
      : users.filter((user) => user.role === filterRole);

  // Role color mapping
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'error';
      case 'subscriber':
        return 'success';
      case 'curator':
        return 'info';
      default:
        return 'default';
    }
  };

  // Subscription status color mapping
  const getSubscriptionColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Render mobile card view
  const renderMobileView = () => {
    return (
      <Box sx={{ mt: 2 }}>
        {filteredUsers.length === 0 ? (
          <Card sx={{ mb: 2, bgcolor: '#f9fafb' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body1">No users found.</Typography>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user._id} sx={{ mb: 2, bgcolor: '#f9fafb' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    color={getRoleColor(user.role)}
                  />
                  <Chip 
                    label={user.subscriptionStatus} 
                    size="small" 
                    color={getSubscriptionColor(user.subscriptionStatus)}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    );
  };

  // Render desktop table view
  const renderTableView = () => {
    return (
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subscription Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    color={getRoleColor(user.role)}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.subscriptionStatus} 
                    size="small" 
                    color={getSubscriptionColor(user.subscriptionStatus)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(user)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.main">
          User Management
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Controls */}
      <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
            <InputLabel id="role-filter-label">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterList fontSize="small" sx={{ mr: 1 }} />
                Filter by Role
              </Box>
            </InputLabel>
            <Select
              labelId="role-filter-label"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              label="Filter by Role"
            >
              <MenuItem value="All">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="subscriber">Subscriber</MenuItem>
              <MenuItem value="curator">Curator</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={fetchUsers}
            className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#2563EB] hover:text-black"
            sx={{ 
              background: 'linear-gradient(to right, #1E3A8A, #3B82F6)',
              '&:hover': {
                background: 'linear-gradient(to right, #1E40AF, #2563EB)',
              }
            }}
          >
            Refresh Users
          </Button>
        </Grid>
      </Grid>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        /* User Data */
        isMobile ? renderMobileView() : renderTableView()
      )}

      {/* Edit User Dialog */}
      {editUser && (
        <Dialog 
          open={openEdit} 
          onClose={() => setOpenEdit(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Edit User
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 1, px: 3, mt: 1 }}>
            <TextField
              fullWidth
              margin="dense"
              label="Username"
              name="username"
              value={editUser.username}
              onChange={handleEditChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              value={editUser.email}
              onChange={handleEditChange}
              variant="outlined"
            />
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={editUser.role}
                onChange={handleEditChange}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
                <MenuItem value="curator">Curator</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setOpenEdit(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit} 
              variant="contained"
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#2563EB] hover:text-black"
              sx={{ 
                background: 'linear-gradient(to right, #1E3A8A, #3B82F6)',
                '&:hover': {
                  background: 'linear-gradient(to right, #1E40AF, #2563EB)',
                }
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default UserManagementTable;