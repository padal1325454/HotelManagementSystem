import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

export default function RoomBooking() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Room Booking</Typography>
      <TextField
        label="Select Date"
        type="date"
        sx={{ mt: 2, mb: 2 }}
        fullWidth
      />
      <Button variant="contained" color="primary">
        Book Room
      </Button>
    </Box>
  );
}
