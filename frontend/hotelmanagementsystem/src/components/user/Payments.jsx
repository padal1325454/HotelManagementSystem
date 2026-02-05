import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Payments() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Payments</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        View Invoices
      </Button>
    </Box>
  );
}
