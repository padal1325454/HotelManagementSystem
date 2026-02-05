// Full upgraded PaymentManagement.jsx with Room Rate display, guest validation, and strict checks
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, InputBase,
  Chip, Snackbar, Alert, Fade, Collapse, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [paymentData, setPaymentData] = useState({
    bookingId: '',
    amount: '',
    method: '',
    status: 'PENDING',
  });

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/payments`);
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to fetch payments', severity: 'error' });
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`);
      const validBookings = res.data.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING');
      setBookings(validBookings);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to fetch bookings', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchBookings();
  }, []);

  const handleOpen = (payment = null) => {
    setEditMode(!!payment);
    setPaymentData(payment ? { ...payment } : { bookingId: '', amount: '', method: '', status: 'PENDING' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (!paymentData.bookingId || !paymentData.amount || !paymentData.method) {
        setSnackbar({ open: true, message: 'All fields are required', severity: 'warning' });
        return;
      }
      if (parseFloat(paymentData.amount) <= 0) {
        setSnackbar({ open: true, message: 'Amount must be greater than 0', severity: 'warning' });
        return;
      }

      const booking = bookings.find(b => b.bookingId.toString() === paymentData.bookingId.toString());
      if (!booking) {
        setSnackbar({ open: true, message: 'Invalid Booking selected', severity: 'error' });
        return;
      }

      const endpoint = editMode
        ? `${API_BASE_URL}/payments/${paymentData.paymentId}/update`
        : `${API_BASE_URL}/payments`;

      const method = editMode ? 'put' : 'post';
      const payload = {
        ...paymentData,
        amount: parseFloat(paymentData.amount),
        method: paymentData.method.toUpperCase(),
        status: paymentData.status.toUpperCase(),
        booking: { bookingId: parseInt(paymentData.bookingId) }
      };

      await axios[method](endpoint, payload);
      setSnackbar({ open: true, message: editMode ? 'Payment updated' : 'Payment added', severity: 'success' });
      fetchPayments();
      handleClose();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to save payment', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/payments/${id}/delete`);
      setSnackbar({ open: true, message: 'Payment deleted', severity: 'info' });
      fetchPayments();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete payment', severity: 'error' });
    }
  };

  const filteredPayments = payments.filter(p =>
    p.bookingId?.toString().includes(searchTerm.toLowerCase()) &&
    (!statusFilter || p.status === statusFilter.toUpperCase())
  );

  const summary = {
    total: payments.length,
    completed: payments.filter((p) => p.status === 'COMPLETED').length,
    pending: payments.filter((p) => p.status === 'PENDING').length,
    failed: payments.filter((p) => p.status === 'FAILED').length,
  };

  return (
    <Fade in>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Payment Management</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {['Total', 'Completed', 'Pending', 'Failed'].map((label, i) => (
            <Paper key={i} sx={{ p: 2, flex: 1, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <Typography variant="h6">{label}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {summary[label.toLowerCase()] ?? 0}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <InputBase
            placeholder="Search Booking ID"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ px: 2, border: 1, borderColor: 'divider', borderRadius: 1, flex: 1 }}
            startAdornment={<SearchIcon sx={{ mr: 1 }} />}
          />
          {['PENDING', 'COMPLETED', 'FAILED'].map((s, idx) => (
            <Chip
              key={idx}
              label={s}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              color={statusFilter === s ? 'primary' : 'default'}
              onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
            />
          ))}
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
            Add Payment
          </Button>
        </Box>

        <Collapse in>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Room Rate</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((payment) => {
                  const booking = bookings.find(b => b.bookingId === payment.bookingId);
                  return (
                    <TableRow key={payment.paymentId}>
                      <TableCell>{payment.bookingId}</TableCell>
                      <TableCell>{booking?.guestName || 'N/A'}</TableCell>
                      <TableCell>{booking?.price ? `$${booking.price}` : 'N/A'}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={
                            payment.status === 'COMPLETED'
                              ? 'success'
                              : payment.status === 'FAILED'
                              ? 'error'
                              : 'warning'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(payment)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(payment.paymentId)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editMode ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Booking"
              margin="dense"
              fullWidth
              select
              value={paymentData.bookingId}
              onChange={(e) => {
                const booking = bookings.find(b => b.bookingId === parseInt(e.target.value));
                setPaymentData({
                  ...paymentData,
                  bookingId: e.target.value,
                  amount: booking?.price || '',
                });
              }}
            >
              {bookings.map((b) => (
                <MenuItem key={b.bookingId} value={b.bookingId}>
                  {b.bookingId} - {b.guestName} (Rate: ${b.price ?? 'N/A'})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              margin="dense"
              type="number"
              fullWidth
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
            />
            <TextField
              label="Method"
              margin="dense"
              select
              fullWidth
              value={paymentData.method}
              onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
            >
              {['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'CASH'].map((method) => (
                <MenuItem key={method} value={method}>{method}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Status"
              margin="dense"
              select
              fullWidth
              value={paymentData.status}
              onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
            >
              {['PENDING', 'COMPLETED', 'FAILED'].map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
}
