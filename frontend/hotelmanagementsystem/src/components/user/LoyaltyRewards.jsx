import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LoyaltyRewards() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Loyalty Rewards</Typography>
      <Typography sx={{ mt: 2 }}>You have 1200 points!</Typography>
    </Box>
  );
}
