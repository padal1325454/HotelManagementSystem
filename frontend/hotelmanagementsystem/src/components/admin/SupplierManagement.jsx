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
  InputBase,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// Backend API URL
const API_BASE_URL = 'http://localhost:8080/api';

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [supplierData, setSupplierData] = useState({
    name: '',
    contactInfo: '',
    address: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch suppliers from backend
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleOpen = (supplier = null) => {
    setEditMode(Boolean(supplier));
    setSupplierData(supplier || { name: '', contactInfo: '', address: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSupplierData({ name: '', contactInfo: '', address: '' });
  };

  const handleSave = async () => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const url = editMode ? `${API_BASE_URL}/suppliers/${supplierData.supplierId}/update` : `${API_BASE_URL}/suppliers`;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });

      fetchSuppliers();
      handleClose();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/suppliers/${id}/delete`, { method: 'DELETE' });
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        Supplier Management
      </Typography>

      {/* Search & Actions */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchIcon />
            <InputBase
              placeholder="Search Supplier"
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
            Add Supplier
          </Button>
        </Grid>
      </Grid>

      {/* Supplier Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.supplierId}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactInfo}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <Button color="primary" startIcon={<EditIcon />} onClick={() => handleOpen(supplier)}>
                    Edit
                  </Button>
                  <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(supplier.supplierId)} sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Supplier Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={supplierData.name}
            onChange={(e) => setSupplierData({ ...supplierData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Info"
            fullWidth
            value={supplierData.contactInfo}
            onChange={(e) => setSupplierData({ ...supplierData, contactInfo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={supplierData.address}
            onChange={(e) => setSupplierData({ ...supplierData, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
