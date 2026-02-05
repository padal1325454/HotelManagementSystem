import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Badge,
  MenuItem,
  Slider,
} from '@mui/material';

// Membership logos
const membershipLogos = {
  Gold: "/logos/gold.jpg",
  Silver: "/logos/silver.png",
  Platinum: "/logos/platinum.png",
};

const membershipOptions = ['Gold', 'Silver', 'Platinum'];

export default function LoyaltyProgramManagement() {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([]);
  const [filter, setFilter] = useState('');
  const [pointsRange, setPointsRange] = useState([0, 300]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [programData, setProgramData] = useState({
    guestName: '',
    points: '',
    membershipLevel: '',
  });
  const [viewData, setViewData] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Fetch loyalty programs (mock API call)
  useEffect(() => {
    setLoyaltyPrograms([
      { id: 1, guestName: 'John Doe', points: 120, membershipLevel: 'Gold' },
      { id: 2, guestName: 'Jane Smith', points: 80, membershipLevel: 'Silver' },
      { id: 3, guestName: 'Bob Williams', points: 200, membershipLevel: 'Platinum' },
      { id: 4, guestName: 'Alice Brown', points: 50, membershipLevel: 'Silver' },

    ]);
  }, []);

  const handleOpen = (program = null) => {
    setEditMode(Boolean(program));
    setProgramData(
      program || { guestName: '', points: '', membershipLevel: '' }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProgramData({ guestName: '', points: '', membershipLevel: '' });
  };

  const handleSave = () => {
    if (editMode) {
      setLoyaltyPrograms((prev) =>
        prev.map((p) => (p.id === programData.id ? programData : p))
      );
    } else {
      setLoyaltyPrograms((prev) => [
        ...prev,
        { id: Date.now(), ...programData },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setLoyaltyPrograms((prev) =>
      prev.filter((program) => program.id !== id)
    );
  };

  const handleViewOpen = (program) => {
    setViewData(program);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewData({});
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Guest Name,Points,Membership Level"]
        .concat(
          loyaltyPrograms.map(
            (p) => `${p.guestName},${p.points},${p.membershipLevel}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "loyalty_programs.csv";
    link.click();
  };

  const filteredPrograms = loyaltyPrograms.filter(
    (program) =>
      program.guestName.toLowerCase().includes(filter.toLowerCase()) ||
      program.membershipLevel.toLowerCase().includes(filter.toLowerCase())
  ).filter((program) => program.points >= pointsRange[0] && program.points <= pointsRange[1]);

  // Count the number of members per membership level
  const memberCounts = {
    Gold: loyaltyPrograms.filter((p) => p.membershipLevel === 'Gold').length,
    Silver: loyaltyPrograms.filter((p) => p.membershipLevel === 'Silver').length,
    Platinum: loyaltyPrograms.filter((p) => p.membershipLevel === 'Platinum').length,
  };

  // Calculate analytics
  const totalPoints = loyaltyPrograms.reduce((acc, p) => acc + p.points, 0);
  const averagePoints =
    loyaltyPrograms.length > 0 ? totalPoints / loyaltyPrograms.length : 0;

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Section: Header and Membership Logos */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Loyalty Program Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          {Object.keys(membershipLogos).map((level) => (
            <Tooltip title={level} key={level}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {/* Member count on top */}
                <Badge
                  badgeContent={memberCounts[level] || 0}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: 10,
                    zIndex: 1,
                  }}
                />
                <Box
                  component="img"
                  src={membershipLogos[level]}
                  alt={`${level} Logo`}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          sx={{ marginLeft: 2 }}
        >
          Add New Member
        </Button>
      </Box>

      {/* Analytics Summary */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
          borderRadius: 2,
          margin: 3,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Total Points: {totalPoints}</Typography>
        <Typography variant="h6">Average Points: {averagePoints.toFixed(2)}</Typography>
        <Button variant="outlined" color="secondary" onClick={handleExportCSV}>
          Export as CSV
        </Button>
      </Box>

      {/* Bottom Section: Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
          height: 'calc(100vh - 220px)', // Adjusts based on the header + analytics
        }}
      >
        {/* Points Range Slider */}
        <Typography variant="subtitle1" gutterBottom>
          Filter by Points Range
        </Typography>
        <Slider
          value={pointsRange}
          onChange={(e, newValue) => setPointsRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={300}
          sx={{ mb: 3 }}
        />

        {/* Search Field */}
        <Box
          sx={{
            display: 'flex',
            marginBottom: 3,
            gap: 2,
            alignItems: 'center',
            padding: 2,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search by Guest Name or Membership Level"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>

        {/* Program Cards */}
        <Grid container spacing={3}>
          {filteredPrograms.map((program) => (
            <Grid item xs={12} sm={6} md={4} key={program.id}>
              <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <Avatar sx={{ width: 60, height: 60, marginRight: 2 }}>
                      {program.guestName[0]}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {program.guestName}
                    </Typography>
                    <Box
                      component="img"
                      src={membershipLogos[program.membershipLevel]}
                      alt={program.membershipLevel}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                      }}
                    />
                  </Box>
                  <Typography variant="body1" color="textSecondary">
                    Points: {program.points}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    onClick={() => handleViewOpen(program)}
                  >
                    View Details
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(program.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Add/Edit Program Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Member' : 'Add New Member'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Guest Name"
            fullWidth
            value={programData.guestName}
            onChange={(e) =>
              setProgramData({
                ...programData,
                guestName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Points"
            fullWidth
            type="number"
            value={programData.points}
            onChange={(e) =>
              setProgramData({
                ...programData,
                points: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            select
            label="Membership Level"
            fullWidth
            value={programData.membershipLevel}
            onChange={(e) =>
              setProgramData({
                ...programData,
                membershipLevel: e.target.value,
              })
            }
          >
            {membershipOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewOpen} onClose={handleViewClose}>
        <DialogTitle>Member Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Guest Name: {viewData.guestName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Points: {viewData.points}
          </Typography>
          <Typography variant="body1">
            Membership Level: {viewData.membershipLevel}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

