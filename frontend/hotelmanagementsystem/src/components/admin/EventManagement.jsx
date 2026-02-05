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
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [eventData, setEventData] = useState({
    guestName: '',
    roomId: '',
    eventDate: '',
    description: '',
  });
  const [viewData, setViewData] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Fetch events (mock API call)
  useEffect(() => {
    setEvents([
      {
        id: 1,
        guestName: 'John Doe',
        roomId: '101',
        eventDate: '2025-03-15',
        description: 'Birthday Party',
      },
      {
        id: 2,
        guestName: 'Jane Smith',
        roomId: '201',
        eventDate: '2025-03-20',
        description: 'Wedding Reception',
      },
    ]);
  }, []);

  const handleOpen = (event = null) => {
    setEditMode(Boolean(event));
    setEventData(
      event || { guestName: '', roomId: '', eventDate: '', description: '' }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEventData({ guestName: '', roomId: '', eventDate: '', description: '' });
  };

  const handleSave = () => {
    if (editMode) {
      setEvents((prev) =>
        prev.map((e) => (e.id === eventData.id ? eventData : e))
      );
    } else {
      setEvents((prev) => [...prev, { id: Date.now(), ...eventData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const handleViewOpen = (event) => {
    setViewData(event);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewData({});
  };

  const filteredEvents = events.filter(
    (event) =>
      event.guestName.toLowerCase().includes(filter.toLowerCase()) ||
      event.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
          borderRadius: 2,
          marginBottom: 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Event Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add New Event
        </Button>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 2,
          borderRadius: 2,
          marginBottom: 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SearchIcon sx={{ marginRight: 2 }} />
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search events by guest name or description"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card
              sx={{
                boxShadow: 6,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}
                >
                  <Avatar sx={{ backgroundColor: '#1976d2', marginRight: 2 }}>
                    <EventIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {event.guestName}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Room ID: <span style={{ color: '#4caf50' }}>{event.roomId}</span>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Event Date: <span style={{ color: '#ff9800' }}>{event.eventDate}</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#757575',
                    fontStyle: 'italic',
                  }}
                >
                  "{event.description}"
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen(event)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleViewOpen(event)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Event Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Guest Name"
            fullWidth
            value={eventData.guestName}
            onChange={(e) =>
              setEventData({ ...eventData, guestName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Room ID"
            fullWidth
            value={eventData.roomId}
            onChange={(e) =>
              setEventData({ ...eventData, roomId: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Event Date"
            fullWidth
            type="date"
            value={eventData.eventDate}
            onChange={(e) =>
              setEventData({ ...eventData, eventDate: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
          />
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
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Guest Name: {viewData.guestName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Room ID: {viewData.roomId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Event Date: {viewData.eventDate}
          </Typography>
          <Typography variant="body2">
            Description: {viewData.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
