import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });
  const [editMode, setEditMode] = useState(false);

  // Fetch users (mock API call)
  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Guest' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Employee' },
    ]);
  }, []);

  const handleOpen = (user = null) => {
    setEditMode(Boolean(user));
    setUserData(user || { name: '', email: '', role: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserData({ name: '', email: '', role: '' });
  };

  const handleSave = () => {
    if (editMode) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? userData : u))
      );
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...userData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpen(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
