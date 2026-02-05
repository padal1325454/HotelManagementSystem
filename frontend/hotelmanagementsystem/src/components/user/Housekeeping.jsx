import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Housekeeping() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Housekeeping Requests</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Request
      </Button>
    </Box>
  );
}
