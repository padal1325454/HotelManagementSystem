import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function FoodOrders() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Food Orders</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Place Order
      </Button>
    </Box>
  );
}
