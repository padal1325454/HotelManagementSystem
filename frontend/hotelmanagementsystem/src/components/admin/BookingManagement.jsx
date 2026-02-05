import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Tabs, Tab, Table, TableContainer, Paper,
  TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, IconButton, InputBase,
  MenuItem, Select, Autocomplete, Chip, CircularProgress, Badge,
  RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Snackbar, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import dayjs from "dayjs";

const API_BASE_URL = "http://localhost:8080/api";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [bookingDialogData, setBookingDialogData] = useState({
    guestType: "existing",
    existingGuestId: "",
    newGuest: { name: "", email: "", contactInfo: "", address: "" },
    roomId: "",
    checkIn: dayjs().format("YYYY-MM-DD"),
    checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),
    status: "PENDING",
    bookingId: null
  });

  const TABS = { ALL: 0, PENDING: 1, CONFIRMED: 2, CANCELLED: 3, COMPLETED: 4, AVAILABLE_ROOMS: 5 };
  const bookingStatusOptions = ["CONFIRMED", "CANCELLED", "COMPLETED", "PENDING"];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBookings(), fetchRooms(), fetchGuests(), fetchRoomTypes()]);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`);
      const updatedBookings = res.data.map(booking => {
        const today = dayjs();
        const checkout = dayjs(booking.checkOut);
        if (checkout.isBefore(today, 'day') && booking.status !== "COMPLETED") {
          return { ...booking, status: "COMPLETED" };
        }
        return booking;
      });
      setBookings(updatedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      showSnackbar("Failed to load bookings", "error");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(res.data);
    } catch (err) {
      showSnackbar("Failed to load rooms", "error");
    }
  };

  const fetchGuests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/guests`);
      setGuests(res.data);
    } catch (err) {
      showSnackbar("Failed to load guests", "error");
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/roomtypes`);
      setRoomTypes(res.data);
    } catch (err) {
      showSnackbar("Failed to load room types", "error");
    }
  };

  const handleSaveBooking = async () => {
    try {
      if (new Date(bookingDialogData.checkOut) <= new Date(bookingDialogData.checkIn)) {
        showSnackbar("Check-out must be after check-in", "error");
        return;
      }

      let payload, res;
      if (bookingDialogData.guestType === "existing") {
        payload = {
          guestId: bookingDialogData.existingGuestId,
          roomId: bookingDialogData.roomId,
          checkIn: bookingDialogData.checkIn,
          checkOut: bookingDialogData.checkOut,
          status: bookingDialogData.status
        };
        res = editMode
          ? await axios.put(`${API_BASE_URL}/bookings/${bookingDialogData.bookingId}/update`, payload)
          : await axios.post(`${API_BASE_URL}/bookings/existing-guest-booking`, payload);
      } else {
        payload = {
          guestName: bookingDialogData.newGuest.name,
          guestEmail: bookingDialogData.newGuest.email,
          contactInfo: bookingDialogData.newGuest.contactInfo,
          address: bookingDialogData.newGuest.address,
          roomId: bookingDialogData.roomId,
          checkIn: bookingDialogData.checkIn,
          checkOut: bookingDialogData.checkOut,
          status: bookingDialogData.status
        };
        res = await axios.post(`${API_BASE_URL}/bookings/new-guest-booking`, payload);
      }

      showSnackbar(editMode ? "Booking updated" : "Booking added", "success");
      fetchBookings();
      handleCloseBookingDialog();
    } catch (err) {
      console.error("Save error:", err);
      showSnackbar("Error saving booking", "error");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      showSnackbar("Booking deleted successfully", "success");
      fetchBookings();
    } catch (err) {
      console.error("Delete error:", err);
      showSnackbar("Error deleting booking", "error");
    }
  };

  const handleCloseBookingDialog = () => setOpenBookingDialog(false);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
  const handleOpenBookingDialog = (booking = null, room = null) => {
    setEditMode(Boolean(booking));
    setBookingDialogData(
      booking
        ? {
            guestType: "existing",
            existingGuestId: booking.guestId || (booking.guest ? booking.guest.guestId : ""),
            newGuest: { name: "", email: "", contactInfo: "", address: "" },
            roomId: booking.roomId || (booking.room ? booking.room.roomId : ""),
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            status: booking.status,
            bookingId: booking.bookingId
          }
        : {
            guestType: "new",
            existingGuestId: "",
            newGuest: { name: "", email: "", contactInfo: "", address: "" },
            roomId: room ? room.roomId : "",
            checkIn: dayjs().format("YYYY-MM-DD"),
            checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),
            status: "PENDING",
            bookingId: null
          }
    );
    setOpenBookingDialog(true);
  };

  const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });

  const getFilteredBookings = () => {
    const status =
      activeTab === TABS.PENDING ? "PENDING" :
      activeTab === TABS.CONFIRMED ? "CONFIRMED" :
      activeTab === TABS.CANCELLED ? "CANCELLED" :
      activeTab === TABS.COMPLETED ? "COMPLETED" : null;

    return bookings.filter(b =>
      (!status || b.status === status) &&
      (!searchTerm || b.guestName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length
  };

  const availableRooms = rooms.filter((room) => room.status === "AVAILABLE");

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }} role="main">
      {/* Left Navbar */}
      <Box
        sx={{
          width: "25%",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ccc",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
          Options
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenBookingDialog()}
        >
          Add Booking
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setActiveTab(TABS.AVAILABLE_ROOMS)}
        >
          Available Rooms
        </Button>
        <Tabs
          orientation="vertical"
          value={activeTab <= 3 ? activeTab : false}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ marginTop: 2 }}
        >
          <Tab label="All Bookings" value={TABS.ALL} />
          <Tab label="Pending" value={TABS.PENDING} />
          <Tab label="Confirmed" value={TABS.CONFIRMED} />
          <Tab label="Cancelled" value={TABS.CANCELLED} />
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, overflowY: "auto", padding: 3 }}>
        {/* Booking Stats Section */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginBottom: 2 }}>
          <Badge badgeContent={bookingStats.total} color="primary">
            <Chip label="Total Bookings" />
          </Badge>
          <Badge badgeContent={bookingStats.pending} color="warning">
            <Chip label="Pending" />
          </Badge>
          <Badge badgeContent={bookingStats.confirmed} color="success">
            <Chip label="Confirmed" />
          </Badge>
          <Badge badgeContent={bookingStats.cancelled} color="error">
            <Chip label="Cancelled" />
          </Badge>
        </Box>

        {/* Available Rooms Section */}
        {activeTab === TABS.AVAILABLE_ROOMS && (
          <>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Available Rooms
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
              <SearchIcon />
              <InputBase
                placeholder="Search rooms by type or ID"
                value={roomSearchTerm}
                onChange={(e) => setRoomSearchTerm(e.target.value)}
                sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 1, flex: 1 }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 4 }}>
              {availableRooms.map((room) => (
                <Paper
                  key={room.roomId}
                  sx={{
                    padding: 2,
                    width: 200,
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: "#e3f2fd",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease"
                    }
                  }}
                  onClick={() => handleOpenBookingDialog(null, room)}
                >
                  <Typography variant="h6">{room.roomType?.name || "Unknown"}</Typography>
                  <Typography variant="body2">Room ID: {room.roomId}</Typography>
                  <Typography variant="body2">Price: ${room.price}/night</Typography>
                  <Chip 
                    label={room.status} 
                    size="small"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Box>
          </>
        )}

        {/* Booking List */}
        {activeTab !== TABS.AVAILABLE_ROOMS && (
          <>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Booking List
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
              <SearchIcon />
              <InputBase
                placeholder="Search bookings by guest name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 1, flex: 1 }}
              />
            </Box>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh"
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Guest Name</TableCell>
                      <TableCell>Room Type</TableCell>
                      <TableCell>Check-In</TableCell>
                      <TableCell>Check-Out</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getFilteredBookings().map((booking) => (
                      <TableRow key={booking.bookingId}>
                        <TableCell>{booking.guestName || "Unknown"}</TableCell>
                        <TableCell>
                          {/* You'll need to fetch room types separately */}
                          {rooms.find(r => r.roomId === booking.roomId)?.roomType?.name || "Unknown"}
                        </TableCell>
                        <TableCell>
                          {dayjs(booking.checkIn).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          {dayjs(booking.checkOut).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={booking.status}
                            color={
                              booking.status === "CONFIRMED"
                                ? "success"
                                : booking.status === "PENDING"
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenBookingDialog(booking)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteBooking(booking.bookingId)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Box>

      {/* Booking Dialog */}
      <Dialog
        open={openBookingDialog}
        onClose={handleCloseBookingDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editMode ? "Edit Booking" : "Add Booking"}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Guest Type</FormLabel>
            <RadioGroup
              row
              value={bookingDialogData.guestType}
              onChange={(e) =>
                setBookingDialogData({
                  ...bookingDialogData,
                  guestType: e.target.value
                })
              }
            >
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Existing Guest"
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="New Guest"
              />
            </RadioGroup>
          </FormControl>

          {bookingDialogData.guestType === "existing" && (
            <Autocomplete
              options={guests}
              getOptionLabel={(guest) =>
                `${guest.name || guest.user?.name || "Unknown"} (${guest.email || guest.user?.email || "No email"})`
              }
              value={
                guests.find(
                  (guest) => guest.guestId === bookingDialogData.existingGuestId
                ) || null
              }
              onChange={(event, newValue) => {
                setBookingDialogData({
                  ...bookingDialogData,
                  existingGuestId: newValue ? newValue.guestId : ""
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Guest"
                  placeholder="Search by name or email"
                  margin="dense"
                  required
                />
              )}
            />
          )}

          {bookingDialogData.guestType === "new" && (
            <>
              <TextField
                margin="dense"
                label="Full Name"
                fullWidth
                value={bookingDialogData.newGuest.name}
                onChange={(e) =>
                  setBookingDialogData({
                    ...bookingDialogData,
                    newGuest: {
                      ...bookingDialogData.newGuest,
                      name: e.target.value
                    }
                  })
                }
                required
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={bookingDialogData.newGuest.email}
                onChange={(e) =>
                  setBookingDialogData({
                    ...bookingDialogData,
                    newGuest: {
                      ...bookingDialogData.newGuest,
                      email: e.target.value
                    }
                  })
                }
                required
              />
              <TextField
                margin="dense"
                label="Contact Info"
                fullWidth
                value={bookingDialogData.newGuest.contactInfo}
                onChange={(e) =>
                  setBookingDialogData({
                    ...bookingDialogData,
                    newGuest: {
                      ...bookingDialogData.newGuest,
                      contactInfo: e.target.value
                    }
                  })
                }
                required
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={bookingDialogData.newGuest.address}
                onChange={(e) =>
                  setBookingDialogData({
                    ...bookingDialogData,
                    newGuest: {
                      ...bookingDialogData.newGuest,
                      address: e.target.value
                    }
                  })
                }
              />
            </>
          )}

          <Autocomplete
            options={rooms.filter((room) => room.status === "AVAILABLE")}
            getOptionLabel={(room) =>
              `${room.roomType?.name || "Unknown"} (Room ID: ${room.roomId})`
            }
            value={
              rooms.find((room) => room.roomId === bookingDialogData.roomId) ||
              null
            }
            onChange={(event, newValue) => {
              setBookingDialogData({
                ...bookingDialogData,
                roomId: newValue ? newValue.roomId : ""
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Room"
                placeholder="Search by room type or ID"
                margin="dense"
                required
              />
            )}
          />

          <TextField
            margin="dense"
            label="Check-In Date"
            type="date"
            fullWidth
            value={bookingDialogData.checkIn}
            onChange={(e) =>
              setBookingDialogData({
                ...bookingDialogData,
                checkIn: e.target.value
              })
            }
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            margin="dense"
            label="Check-Out Date"
            type="date"
            fullWidth
            value={bookingDialogData.checkOut}
            onChange={(e) =>
              setBookingDialogData({
                ...bookingDialogData,
                checkOut: e.target.value
              })
            }
            InputLabelProps={{ shrink: true }}
            required
          />

          <Select
            margin="dense"
            label="Status"
            fullWidth
            value={bookingDialogData.status}
            onChange={(e) =>
              setBookingDialogData({
                ...bookingDialogData,
                status: e.target.value
              })
            }
            required
          >
            {["PENDING", "CONFIRMED", "CANCELLED"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}

          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveBooking} color="primary">
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}