import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
  '&.Mui-selected': {
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e40af',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 58, 138, 0.1)' : 'rgba(30, 64, 175, 0.05)',
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 58, 138, 0.2)' : 'rgba(30, 64, 175, 0.1)',
  },
}));

export default function RoomManagement() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [openRoomTypeDialog, setOpenRoomTypeDialog] = useState(false);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomTypeData, setRoomTypeData] = useState({ name: "", description: "", maxOccupancy: 1 });
  const [roomData, setRoomData] = useState({ roomTypeId: "", price: "", status: "AVAILABLE" });

  useEffect(() => {
    fetchRoomTypes();
    fetchRooms();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/roomtypes");
      setRoomTypes(response.data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRoomTypeDialogOpen = () => setOpenRoomTypeDialog(true);
  const handleRoomTypeDialogClose = () => {
    setOpenRoomTypeDialog(false);
    setRoomTypeData({ name: "", description: "", maxOccupancy: 1 });
  };

  const handleRoomDialogOpen = (room = null) => {
    setEditMode(!!room);
    if (room) {
      setRoomData({
        roomTypeId: room.roomType.roomTypeId,
        price: room.price,
        status: room.status,
      });
      setSelectedRoom(room);
    } else {
      setRoomData({ roomTypeId: "", price: "", status: "AVAILABLE" });
      setSelectedRoom(null);
    }
    setOpenRoomDialog(true);
  };

  const handleRoomDialogClose = () => {
    setOpenRoomDialog(false);
    setRoomData({ roomTypeId: "", price: "", status: "AVAILABLE" });
  };

  const handleSaveRoomType = async () => {
    try {
      await axios.post("http://localhost:8080/api/roomtypes", roomTypeData);
      fetchRoomTypes();
      handleRoomTypeDialogClose();
    } catch (error) {
      console.error("Error saving room type:", error);
    }
  };

  const handleSaveRoom = async () => {
    try {
      const payload = {
        roomType: { roomTypeId: roomData.roomTypeId },
        price: roomData.price,
        status: roomData.status,
      };

      if (editMode) {
        await axios.put(`http://localhost:8080/api/rooms/${selectedRoom.roomId}/update`, payload);
      } else {
        await axios.post("http://localhost:8080/api/rooms", payload);
      }

      fetchRooms();
      handleRoomDialogClose();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      if (window.confirm("Are you sure you want to delete this room?")) {
        await axios.delete(`http://localhost:8080/api/rooms/${roomId}/delete`);
        fetchRooms();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    switch (activeTab) {
      case 0: return room.status === "AVAILABLE";
      case 1: return room.status === "OCCUPIED";
      case 2: return room.status === "MAINTENANCE";
      case 3: return room.status === "CLEANING";
      default: return true;
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 3 }}>
      {/* Header and Tabs */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
          Room Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleRoomTypeDialogOpen}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
              }
            }}
          >
            Add Room Type
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleRoomDialogOpen()}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
              }
            }}
          >
            Add Room
          </Button>
        </Box>
      </Box>

      <StyledTabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <StyledTab label="Available" />
        <StyledTab label="Occupied" />
        <StyledTab label="Maintenance" />
        <StyledTab label="Cleaning" />
      </StyledTabs>

      {/* Content Area */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {activeTab === "roomTypes" ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: theme.palette.text.primary }}>
              Room Types
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
                  }}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Room Type</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Max Occupancy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomTypes.map((type) => (
                    <StyledTableRow key={type.roomTypeId}>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{type.name}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{type.description}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{type.maxOccupancy}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: theme.palette.text.primary }}>
              {["Available Rooms", "Occupied Rooms", "Maintenance Rooms", "Cleaning Rooms"][activeTab]}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
                  }}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Room ID</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Room Type</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <StyledTableRow key={room.roomId}>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{room.roomId}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{room.roomType.name}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{room.status}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{room.price}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleRoomDialogOpen(room)}
                            sx={{
                              color: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                              '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(30, 64, 175, 0.1)',
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteRoom(room.roomId)}
                            sx={{
                              color: theme.palette.mode === 'dark' ? '#dc2626' : '#dc2626',
                              '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      {/* Dialogs */}
      <Dialog 
        open={openRoomTypeDialog} 
        onClose={handleRoomTypeDialogClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Add Room Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={roomTypeData.name}
            onChange={(e) => setRoomTypeData({ ...roomTypeData, name: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={roomTypeData.description}
            onChange={(e) => setRoomTypeData({ ...roomTypeData, description: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Max Occupancy"
            type="number"
            fullWidth
            margin="dense"
            value={roomTypeData.maxOccupancy}
            onChange={(e) => setRoomTypeData({ ...roomTypeData, maxOccupancy: e.target.value })}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleRoomTypeDialogClose}
            sx={{ color: theme.palette.text.primary }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveRoomType}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openRoomDialog} 
        onClose={handleRoomDialogClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle sx={{ color: theme.palette.text.primary }}>
          {editMode ? "Edit Room" : "Add Room"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Room Type"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={roomData.roomTypeId}
            onChange={(e) => setRoomData({ ...roomData, roomTypeId: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((type) => (
              <option key={type.roomTypeId} value={type.roomTypeId}>
                {type.name}
              </option>
            ))}
          </TextField>

          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={roomData.price}
            onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />

          <TextField
            label="Status"
            fullWidth
            margin="dense"
            select
            value={roomData.status}
            onChange={(e) => setRoomData({ ...roomData, status: e.target.value })}
            SelectProps={{ native: true }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          >
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="CLEANING">Cleaning</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleRoomDialogClose}
            sx={{ color: theme.palette.text.primary }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveRoom}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
              }
            }}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}