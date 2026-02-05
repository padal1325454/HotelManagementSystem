// // HousekeepingMaintenance.jsx - Final Update with CORS fix compatibility + Null-safe Employee handling

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Chip,
//   InputBase,
//   Stack,
//   Divider,
//   Alert,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const API_BASE_URL = 'http://localhost:8080/api';
// const TASK_STATUSES = ['PENDING', 'COMPLETED'];

// export default function HousekeepingMaintenance() {
//   const [tasks, setTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [taskData, setTaskData] = useState({ id: null, roomId: '', employeeId: '', status: 'PENDING' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchTasks();
//     fetchUsers();
//     fetchRooms();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/housekeeping`, { withCredentials: true });
//       setTasks(Array.isArray(res.data) ? res.data : []);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       setErrorMessage('Failed to load housekeeping tasks. Make sure the backend allows access to /api/housekeeping');
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
//       const data = Array.isArray(res.data) ? res.data : [];
//       const employeesOnly = data.filter((user) => user.role === 'EMPLOYEE');
//       setUsers(employeesOnly);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/rooms`, { withCredentials: true });
//       setRooms(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//     }
//   };

//   const handleOpen = (task = null) => {
//     setEditMode(Boolean(task));
//     if (task) {
//       setTaskData({
//         id: task.housekeepingId,
//         roomId: task.roomIds?.[0] || '',
//         employeeId: task.employeeId || '',
//         status: task.status,
//       });
//     } else {
//       setTaskData({ id: null, roomId: '', employeeId: '', status: 'PENDING' });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setTaskData({ id: null, roomId: '', employeeId: '', status: 'PENDING' });
//   };

//   const saveTask = async () => {
//     if (!taskData.employeeId || !taskData.roomId) {
//       alert("Please select a room and an employee.");
//       return;
//     }
  
//     const payload = {
//       housekeepingId: taskData.id,
//       roomIds: [taskData.roomId],
//       employeeId: taskData.employeeId,
//       status: taskData.status,
//     };
  
//     console.log("Payload being sent:", payload); // Debugging step
  
//     const method = editMode ? "put" : "post";
//     const url = editMode
//       ? `${API_BASE_URL}/housekeeping/${taskData.id}/update`
//       : `${API_BASE_URL}/housekeeping`;
  
//     try {
//       const response = await axios[method](url, payload, { withCredentials: true });
//       console.log("Response:", response.data);
//       fetchTasks();
//       handleClose();
//     } catch (error) {
//       console.error("Save failed:", error);
//       alert("Failed to save task. Check console logs.");
//     }
//   };
  
  

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/housekeeping/${id}/delete`, { withCredentials: true });
//       fetchTasks();
//     } catch (error) {
//       alert('Failed to delete task.');
//     }
//   };

//   const filteredTasks = tasks.filter(
//     (task) =>
//       (!statusFilter || task.status === statusFilter) &&
//       (task.roomIds?.[0]?.toString().includes(searchTerm) ||
//         users.find((e) => e.userId === task.employeeId)?.name?.toLowerCase().includes(searchTerm))
//   );

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" mb={3} textAlign="center">
//         Housekeeping Management
//       </Typography>

//       {errorMessage && (
//         <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>
//       )}

//       <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
//         <InputBase
//           placeholder="Search room or employee"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//           startAdornment={<SearchIcon sx={{ mr: 1 }} />}
//           sx={{ border: '1px solid #ccc', borderRadius: 1, px: 2, py: 0.5, minWidth: '250px' }}
//         />
//         <Stack direction="row" spacing={1}>
//           {TASK_STATUSES.map((status) => (
//             <Chip
//               key={status}
//               label={status.charAt(0) + status.slice(1).toLowerCase()}
//               onClick={() => setStatusFilter(status)}
//               color={statusFilter === status ? 'primary' : 'default'}
//             />
//           ))}
//           <Button onClick={() => setStatusFilter('')} variant="outlined">
//             Clear
//           </Button>
//           <Button variant="contained" onClick={() => handleOpen()}>
//             + Add Task
//           </Button>
//         </Stack>
//       </Stack>

//       <Divider sx={{ mb: 2 }} />

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Room</strong></TableCell>
//               <TableCell><strong>Employee</strong></TableCell>
//               <TableCell><strong>Status</strong></TableCell>
//               <TableCell align="center"><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredTasks.map((task) => (
//               <TableRow key={task.housekeepingId}>
//                 <TableCell>{task.roomIds?.[0]}</TableCell>
//                 <TableCell>
//                   {task.employeeId
//                     ? users.find((e) => e.userId === task.employeeId)?.name || 'Unknown'
//                     : 'Unassigned'}
//                 </TableCell>
//                 <TableCell>{task.status}</TableCell>
//                 <TableCell align="center">
//                   <Button size="small" onClick={() => handleOpen(task)}>Edit</Button>
//                   <Button size="small" color="error" onClick={() => deleteTask(task.housekeepingId)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>{editMode ? 'Edit Task' : 'New Task'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Room"
//             select
//             fullWidth
//             margin="dense"
//             value={taskData.roomId}
//             onChange={(e) => setTaskData({ ...taskData, roomId: e.target.value })}
//           >
//             {rooms.map((room) => (
//               <MenuItem key={room.roomId} value={room.roomId}>
//                 {`Room ${room.roomId} - ${room.roomType.name}`}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             label="Employee"
//             select
//             fullWidth
//             margin="dense"
//             value={taskData.employeeId}
//             onChange={(e) => setTaskData({ ...taskData, employeeId: e.target.value })}
//           >
//             {users.map((emp) => (
//               <MenuItem key={emp.userId} value={emp.userId}>
//                 {emp.name}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             label="Status"
//             select
//             fullWidth
//             margin="dense"
//             value={taskData.status}
//             onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
//           >
//             {TASK_STATUSES.map((status) => (
//               <MenuItem key={status} value={status}>{status}</MenuItem>
//             ))}
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" onClick={saveTask}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
    


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Chip,
  InputBase,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const API_BASE_URL = "http://localhost:8080/api";
const TASK_STATUSES = ["PENDING", "COMPLETED"];

export default function HousekeepingMaintenance() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    id: null,
    roomId: "",
    employeeId: "",
    status: "PENDING",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tasks, users, and rooms
  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchRooms();
  }, []);

  const handleApiError = (error, fallbackMessage) => {
    console.error(error);
    setErrorMessage(fallbackMessage || "An error occurred. Please try again.");
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/housekeeping`);
      setTasks(Array.isArray(res.data) ? res.data : []);
      setErrorMessage("");
    } catch (error) {
      handleApiError(error, "Failed to load housekeeping tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      const data = Array.isArray(res.data) ? res.data : [];
      setUsers(data.filter((user) => user.role === "EMPLOYEE"));
    } catch (error) {
      handleApiError(error, "Failed to load users.");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      handleApiError(error, "Failed to load rooms.");
    }
  };

  const handleOpen = (task = null) => {
    setEditMode(Boolean(task));
    if (task) {
      setTaskData({
        id: task.housekeepingId,
        roomId: task.roomId || "",
        employeeId: task.employeeId || "",
        status: task.status,
      });
    } else {
      setTaskData({ id: null, roomId: "", employeeId: "", status: "PENDING" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskData({ id: null, roomId: "", employeeId: "", status: "PENDING" });
  };

  const saveTask = async () => {
    if (!taskData.employeeId || !taskData.roomId) {
      alert("Please select a room and an employee.");
      return;
    }

    const payload = {
      roomId: taskData.roomId,
      employeeId: taskData.employeeId,
      status: taskData.status,
    };

    const method = editMode ? "put" : "post";
    const url = editMode
      ? `${API_BASE_URL}/housekeeping/${taskData.id}/update`
      : `${API_BASE_URL}/housekeeping`;

    try {
      await axios[method](url, payload);
      fetchTasks();
      handleClose();
    } catch (error) {
      handleApiError(error, "Failed to save task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/housekeeping/${id}/delete`);
      fetchTasks();
    } catch (error) {
      handleApiError(error, "Failed to delete task.");
    }
  };

  // Filter tasks based on search term and status
  const filteredTasks = tasks.filter((task) => {
    const roomMatch = task.roomId?.toString().includes(searchTerm);
    const employeeMatch = users
      .find((e) => e.userId === task.employeeId)
      ?.name?.toLowerCase()
      .includes(searchTerm);
    return (!statusFilter || task.status === statusFilter) && (roomMatch || employeeMatch);
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Housekeeping Management
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        spacing={2}
      >
        <InputBase
          placeholder="Search room or employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          startAdornment={<SearchIcon sx={{ mr: 1 }} />}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            px: 2,
            py: 0.5,
            minWidth: "250px",
          }}
        />
        <Stack direction="row" spacing={1}>
          {TASK_STATUSES.map((status) => (
            <Chip
              key={status}
              label={status.charAt(0) + status.slice(1).toLowerCase()}
              onClick={() => setStatusFilter(status)}
              color={statusFilter === status ? "primary" : "default"}
            />
          ))}
          <Button onClick={() => setStatusFilter("")} variant="outlined">
            Clear
          </Button>
          <Button variant="contained" onClick={() => handleOpen()}>
            + Add Task
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Room</strong></TableCell>
                <TableCell><strong>Employee</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length ? (
                filteredTasks.map((task) => (
                  <TableRow key={task.housekeepingId}>
                    <TableCell>{task.roomId}</TableCell>
                    <TableCell>
                      {users.find((e) => e.userId === task.employeeId)?.name || "Unassigned"}
                    </TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell align="center">
                      <Button size="small" onClick={() => handleOpen(task)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => deleteTask(task.housekeepingId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No tasks available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Task" : "New Task"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Room"
            select
            fullWidth
            margin="dense"
            value={taskData.roomId}
            onChange={(e) => setTaskData({ ...taskData, roomId: e.target.value })}
          >
            {rooms.map((room) => (
              <MenuItem key={room.roomId} value={room.roomId}>
                {`Room ${room.roomId}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Employee"
            select
            fullWidth
            margin="dense"
            value={taskData.employeeId}
            onChange={(e) => setTaskData({ ...taskData, employeeId: e.target.value })}
          >
            {users.map((emp) => (
              <MenuItem key={emp.userId} value={emp.userId}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Status"
            select
            fullWidth
            margin="dense"
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          >
            {TASK_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={saveTask}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

  
  