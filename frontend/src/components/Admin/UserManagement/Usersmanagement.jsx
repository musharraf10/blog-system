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
import { Edit, Delete, Close } from '@mui/icons-material';

const UserManagementTable = () => {
  const [users, setUsers] = useState();
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users/getallusers');
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

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

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
      await axios.put(`http://localhost:5000/api/v1/users/update-user/${editUser._id}`, editUser);
      setUsers(users.map((user) => (user._id === editUser._id ? editUser : user)));
      setOpenEdit(false);
      showSnackbar('User updated successfully.');
      handleMenuClose(); // Close menu if open
    } catch (error) {
      console.error('Failed to update user:', error);
      showSnackbar('Failed to update user.');
    }
  };

  const handleDeleteClick = (userId) => {
    setConfirmDelete({ open: true, userId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/delete-user/${confirmDelete.userId}`);
      setUsers(users.filter((user) => user._id !== confirmDelete.userId));
      setConfirmDelete({ open: false, userId: null });
      showSnackbar('User deleted successfully.');
      handleMenuClose(); // Close menu if open
    } catch (error) {
      console.error('Failed to delete user:', error);
      showSnackbar('Failed to delete user.');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, userId: null });
  };

  // Grid view: Open menu for selected user
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const getRoleChip = (role) => {
    let bgColor, textColor;
    switch (role) {
      case 'admin':
        bgColor = '#ffcccb';   // Light red
        textColor = '#b71c1c';  // Dark red
        break;
      case 'subscriber':
        bgColor = '#90ee90';   // Light green
        textColor = '#1b5e20';  // Dark green
        break;
      case 'curator':
        bgColor = '#add8e6';   // Light blue
        textColor = '#0d47a1';  // Dark blue
        break;
      default:
        bgColor = '#ccc';
        textColor = 'black';
        break;
    }
    return (
      <Chip
        label={role}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '0.65rem',
        }}
      />
    );
  };

  // Returns avatar with profile image if available; otherwise, first letter.
  const getUserAvatar = (user) => {
    if (user.profilePicture) {
      return (
        <Avatar alt={user.username} src={user.profilePicture.path} sx={{ width: 60, height: 60 }} />
      );
    } else {
      return (
        <Avatar sx={{ width: 70, height: 70 }}>
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      );
    }
  };

  const filteredUsers = filterRole === 'All' ? users : users.filter((user) => user.role === filterRole);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>

      {/* Filter Role Dropdown */}
      <FormControl style={{ marginBottom: '30px', minWidth: 200 }}>
        <InputLabel style={{ margin: '10px' }}>Filter by Role</InputLabel>
        <Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="subscriber">Subscriber</MenuItem>
          <MenuItem value="curator">curator</MenuItem>
        </Select>
      </FormControl>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Subscription Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.subscriptionStatus}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
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

      {/* Edit User Dialog */}
      {editUser && (
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              value={editUser.username}
              onChange={handleEditChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={editUser.email}
              onChange={handleEditChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={editUser.role}
                onChange={handleEditChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
                <MenuItem value="curator">Curator</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">
              Save
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
    </div>
  );
};

export default UserManagementTable;