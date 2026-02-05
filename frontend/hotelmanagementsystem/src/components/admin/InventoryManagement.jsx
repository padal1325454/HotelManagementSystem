
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
  MenuItem,
  InputBase,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// Backend API URLs
const API_BASE_URL = 'http://localhost:8080/api';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState({
    itemName: '',
    quantity: '',
    supplierId: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch inventory and suppliers from backend
  useEffect(() => {
    fetchInventory();
    fetchSuppliers();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory`);
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleOpen = (item = null) => {
    setEditMode(Boolean(item)); // Set editMode based on whether an item is passed
    setInventoryData(item || { itemName: '', quantity: '', supplierId: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInventoryData({ itemName: '', quantity: '', supplierId: '' });
  };

  const handleSave = async () => {
    try {
      await fetch(`${API_BASE_URL}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventoryData),
      });
      fetchInventory(); // Refresh inventory list
      handleClose(); // Close dialog
    } catch (error) {
      console.error('Error saving inventory item:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE_URL}/inventory/${inventoryData.inventoryId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventoryData),
      });
      fetchInventory(); // Refresh inventory list
      handleClose(); // Close dialog
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/inventory/${id}/delete`, { method: 'DELETE' });
      fetchInventory();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        Inventory Management
      </Typography>

      {/* Search & Actions */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Search Inventory"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              sx={{ border: 1, borderColor: 'divider', borderRadius: 1, px: 1 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>
            Export CSV
          </Button>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ ml: 2 }}>
            Add Inventory Item
          </Button>
        </Grid>
      </Grid>

      {/* Inventory Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.inventoryId}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{suppliers.find(s => s.supplierId === item.supplierId)?.name}</TableCell>
                <TableCell>
                  <Button color="primary" startIcon={<EditIcon />} onClick={() => handleOpen(item)}>
                    Edit
                  </Button>
                  <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(item.inventoryId)} sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Item Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Inventory Item' : 'Add Inventory Item'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Item Name"
            fullWidth
            value={inventoryData.itemName}
            onChange={(e) => setInventoryData({ ...inventoryData, itemName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            type="number"
            value={inventoryData.quantity}
            onChange={(e) => setInventoryData({ ...inventoryData, quantity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Supplier"
            fullWidth
            select
            value={inventoryData.supplierId}
            onChange={(e) => setInventoryData({ ...inventoryData, supplierId: e.target.value })}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editMode ? handleUpdate : handleSave} color="primary">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
