// import React, { useState, useEffect } from 'react';
// import { useDebounce } from 'use-debounce';
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
//   Tabs,
//   Tab,
//   AppBar,
//   Fade,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   InputBase,
//   MenuItem,
//   Select,
//   Autocomplete,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// export default function EmployeeManagement() {
//   const [employees, setEmployees] = useState([]);
//   const [payrolls, setPayrolls] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [payrollOpen, setPayrollOpen] = useState(false);
//   const [userOpen, setUserOpen] = useState(false);
//   const [employeeData, setEmployeeData] = useState({ userId: '', department: '', salary: '' });
//   const [payrollData, setPayrollData] = useState({ payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
//   const [userData, setUserData] = useState({ name: '', email: '', role: 'EMPLOYEE' });
//   const [editMode, setEditMode] = useState(false);
//   const [payrollEditMode, setPayrollEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedRole, setSelectedRole] = useState('EMPLOYEE');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userInput, setUserInput] = useState('');
//   const [employeeInput, setEmployeeInput] = useState('');

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/employees`);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchPayrolls = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/employeepayrolls`);
//       setPayrolls(response.data);
//     } catch (error) {
//       console.error('Error fetching payrolls:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchPayrolls();
//     fetchUsers();
//   }, []);

//   const handleOpen = (employee = null) => {
//     setEditMode(Boolean(employee));
//     setEmployeeData(employee || { userId: '', department: '', salary: '' });
//     setOpen(true);
//   };

//   const handlePayrollOpen = (payroll = null) => {
//     setPayrollEditMode(Boolean(payroll));
//     setPayrollData(payroll || { payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
//     setPayrollOpen(true);
//   };

//   const handleUserOpen = () => {
//     setUserOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEmployeeData({ userId: '', department: '', salary: '' });
//     setUserInput('');
//   };

//   const handlePayrollClose = () => {
//     setPayrollOpen(false);
//     setPayrollData({ payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
//     setEmployeeInput('');
//   };

//   const handleUserClose = () => {
//     setUserOpen(false);
//     setUserData({ name: '', email: '', role: 'EMPLOYEE' });
//   };

//   const handleSave = async () => {
//     const user = users.find((u) => u.userId === employeeData.userId);
//     if (!user) {
//       console.error('User not found!');
//       return;
//     }

//     const payload = {
//       user: user,
//       department: employeeData.department,
//       salary: employeeData.salary,
//     };

//     try {
//       if (editMode) {
//         await axios.put(`${API_BASE_URL}/employees/${employeeData.employeeId}/update`, payload);
//       } else {
//         await axios.post(`${API_BASE_URL}/employees`, payload);
//       }
//       fetchEmployees();
//       handleClose();
//     } catch (error) {
//       console.error('Error saving employee:', error);
//     }
//   };

//   const handlePayrollSave = async () => {
//     const employee = employees.find((emp) => emp.employeeId === payrollData.employeeId);
//     if (!employee) {
//       console.error('Employee not found!');
//       return;
//     }

//     const payload = {
//       employee: employee,
//       salary: payrollData.salary,
//       bonus: payrollData.bonus,
//       deductions: payrollData.deductions,
//     };

//     try {
//       if (payrollEditMode) {
//         await axios.put(`${API_BASE_URL}/employeepayrolls/${payrollData.payrollId}/update`, payload);
//       } else {
//         await axios.post(`${API_BASE_URL}/employeepayrolls`, payload);
//       }
//       fetchPayrolls();
//       handlePayrollClose();
//     } catch (error) {
//       console.error('Error saving payroll:', error);
//     }
//   };

//   const handleUserSave = async () => {
//     const defaultPassword = userData.name.substring(0, 4) + '@123';
//     const payload = { ...userData, password: defaultPassword };

//     try {
//       await axios.post(`${API_BASE_URL}/users`, payload);
//       fetchUsers();
//       handleUserClose();
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/employees/${id}/delete`);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };

//   const handleDeletePayroll = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/employeepayrolls/${id}/delete`);
//       fetchPayrolls();
//     } catch (error) {
//       console.error('Error deleting payroll:', error);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//   };

//   const filteredEmployees = employees.filter((employee) => {
//     const user = users.find((u) => u.userId === employee.userId);
//     const matchesSearch = user?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
//     const matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;
//     return matchesSearch && matchesDepartment;
//   });

//   const filteredPayrolls = payrolls.filter((payroll) => {
//     const employee = employees.find((emp) => emp.employeeId === payroll.employeeId);
//     const user = users.find((u) => u.userId === employee?.userId);
//     return user && (!selectedDepartment || employee.department === selectedDepartment);
//   });

//   const departments = ['HOUSEKEEPING', 'RECEPTION', 'RESTAURANT'];
//   const roles = ['GUEST', 'EMPLOYEE', 'ADMIN'];

//   const TabPanel = ({ children, active }) => (
//     <Fade in={active} timeout={500}>
//       <Box sx={{ display: active ? 'block' : 'none', paddingTop: 0 }}>{children}</Box>
//     </Fade>
//   );

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       {/* Left Navbar for Departments */}
//       <Box sx={{ width: 240, borderRight: 1, borderColor: 'divider', p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Departments
//         </Typography>
//         <List>
//           <ListItem button onClick={() => handleDepartmentSelect('')} sx={{ cursor: 'pointer' }}>
//             <ListItemText primary="All Employees" />
//           </ListItem>
//           <Divider />
//           {departments.map((department) => (
//             <ListItem
//               button
//               key={department}
//               onClick={() => handleDepartmentSelect(department)}
//               selected={selectedDepartment === department}
//               sx={{ cursor: 'pointer' }}
//             >
//               <ListItemText primary={department} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Main Content Area */}
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
//           <Typography variant="h4" gutterBottom>
//             Employee Management
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
//               <SearchIcon sx={{ marginRight: 1 }} />
//               <InputBase
//                 placeholder="Search Employee by Name"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1 }}
//               />
//             </Box>
//             <Select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//               displayEmpty
//               sx={{ marginRight: 2 }}
//             >
//               <MenuItem value="EMPLOYEE">Employee</MenuItem>
//               <MenuItem value="ADMIN">Admin</MenuItem>
//             </Select>
//           </Box>
//         </Box>

//         {/* Horizontal Navbar */}
//         <AppBar position="static" color="default" sx={{ marginBottom: 2 }}>
//           <Tabs
//             value={activeTab}
//             onChange={handleTabChange}
//             indicatorColor="primary"
//             textColor="primary"
//             variant="fullWidth"
//           >
//             <Tab label="Employee List" />
//             <Tab label="Add Employee" />
//             <Tab label="Payroll Management" />
//             <Tab label="Add User" />
//           </Tabs>
//         </AppBar>

//         {/* Employee List */}
//         <TabPanel active={activeTab === 0}>
//           <Typography variant="h6" gutterBottom>
//             Employee List
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Department</TableCell>
//                   <TableCell>Salary</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredEmployees.map((employee) => {
//                   const user = users.find((u) => u.userId === employee.userId);
//                   return (
//                     <TableRow key={employee.employeeId}>
//                       <TableCell>{user?.name}</TableCell>
//                       <TableCell>{user?.email}</TableCell>
//                       <TableCell>{employee.department}</TableCell>
//                       <TableCell>{employee.salary}</TableCell>
//                       <TableCell>
//                         <IconButton color="primary" onClick={() => handleOpen(employee)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton color="secondary" onClick={() => handleDelete(employee.employeeId)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </TabPanel>

//         {/* Add Employee */}
//         <TabPanel active={activeTab === 1}>
//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleOpen()}
//               sx={{ marginBottom: 2 }}
//             >
//               Add New Employee
//             </Button>
//             <Typography variant="body1">
//               Add new employees to your hotel management system here.
//             </Typography>
//           </Box>
//         </TabPanel>

//         {/* Payroll Management */}
//         <TabPanel active={activeTab === 2}>
//           <Typography variant="h6" gutterBottom>
//             Payroll Management
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handlePayrollOpen()}
//             sx={{ marginBottom: 2 }}
//             >
//             Add New Payroll
//           </Button>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Employee Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Department</TableCell>
//                   <TableCell>Salary</TableCell>
//                   <TableCell>Bonus</TableCell>
//                   <TableCell>Deductions</TableCell>
//                   <TableCell>Total Pay</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredPayrolls.map((payroll) => {
//                   const employee = employees.find((emp) => emp.employeeId === payroll.employeeId);
//                   const user = users.find((u) => u.userId === employee?.userId);
//                   return (
//                     <TableRow key={payroll.payrollId}>
//                       <TableCell>{user?.name}</TableCell>
//                       <TableCell>{user?.email}</TableCell>
//                       <TableCell>{employee?.department}</TableCell>
//                       <TableCell>{payroll.salary}</TableCell>
//                       <TableCell>{payroll.bonus}</TableCell>
//                       <TableCell>{payroll.deductions}</TableCell>
//                       <TableCell>{payroll.salary + payroll.bonus - payroll.deductions}</TableCell>
//                       <TableCell>
//                         <IconButton color="primary" onClick={() => handlePayrollOpen(payroll)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton color="secondary" onClick={() => handleDeletePayroll(payroll.payrollId)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </TabPanel>

//         {/* Add User */}
//         <TabPanel active={activeTab === 3}>
//           <Box>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUserOpen}
//               sx={{ marginBottom: 2 }}
//             >
//               Add New User
//             </Button>
//             <Typography variant="body1">
//               Add new users to your hotel management system here.
//             </Typography>
//           </Box>
//         </TabPanel>

//         {/* Dialog for Add/Edit Employee */}
//         <Dialog open={open} onClose={handleClose} TransitionComponent={Fade}>
//           <DialogTitle>{editMode ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
//           <DialogContent>
//             <Autocomplete
//               options={users.filter((user) => user.role !== 'GUEST')}
//               getOptionLabel={(user) => `${user.name} (${user.email})`}
//               value={users.find((user) => user.userId === employeeData.userId) || null}
//               onChange={(event, newValue) => {
//                 setEmployeeData({ ...employeeData, userId: newValue ? newValue.userId : '' });
//               }}
//               inputValue={userInput}
//               onInputChange={(event, newInputValue) => {
//                 setUserInput(newInputValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   placeholder="Search user by name or email"
//                   fullWidth
//                   margin="dense"
//                 />
//               )}
//             />
//             <Select
//               margin="dense"
//               fullWidth
//               value={employeeData.department}
//               onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
//               sx={{ marginBottom: 2 }}
//               displayEmpty
//               renderValue={(selected) => selected || 'Select Department'}
//             >
//               {departments.map((department) => (
//                 <MenuItem key={department} value={department}>
//                   {department}
//                 </MenuItem>
//               ))}
//             </Select>
//             <TextField
//               margin="dense"
//               placeholder="Enter Salary"
//               type="number"
//               fullWidth
//               value={employeeData.salary}
//               onChange={(e) => setEmployeeData({ ...employeeData, salary: e.target.value })}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button onClick={handleSave}>{editMode ? 'Update' : 'Add'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* Dialog for Add/Edit Payroll */}
//         <Dialog open={payrollOpen} onClose={handlePayrollClose} TransitionComponent={Fade}>
//           <DialogTitle>{payrollEditMode ? 'Edit Payroll' : 'Add Payroll'}</DialogTitle>
//           <DialogContent>
//             <Autocomplete
//               options={employees}
//               getOptionLabel={(employee) => {
//                 const user = users.find((u) => u.userId === employee.userId);
//                 return user ? `${user.name} (${user.email})` : 'Unknown';
//               }}
//               value={employees.find((emp) => emp.employeeId === payrollData.employeeId) || null}
//               onChange={(event, newValue) => {
//                 setPayrollData({ ...payrollData, employeeId: newValue ? newValue.employeeId : '' });
//               }}
//               inputValue={employeeInput}
//               onInputChange={(event, newInputValue) => {
//                 setEmployeeInput(newInputValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   placeholder="Search employee by name or email"
//                   fullWidth
//                   margin="dense"
//                 />
//               )}
//             />
//             <TextField
//               margin="dense"
//               placeholder="Enter Salary"
//               type="number"
//               fullWidth
//               value={payrollData.salary}
//               onChange={(e) => setPayrollData({ ...payrollData, salary: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               placeholder="Enter Bonus"
//               type="number"
//               fullWidth
//               value={payrollData.bonus}
//               onChange={(e) => setPayrollData({ ...payrollData, bonus: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               placeholder="Enter Deductions"
//               type="number"
//               fullWidth
//               value={payrollData.deductions}
//               onChange={(e) => setPayrollData({ ...payrollData, deductions: e.target.value })}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handlePayrollClose}>Cancel</Button>
//             <Button onClick={handlePayrollSave}>{payrollEditMode ? 'Update' : 'Add'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* Dialog for Add User */}
//         <Dialog open={userOpen} onClose={handleUserClose} TransitionComponent={Fade}>
//           <DialogTitle>Add User</DialogTitle>
//           <DialogContent>
//             <TextField
//               margin="dense"
//               label="Name"
//               fullWidth
//               value={userData.name}
//               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               label="Email"
//               fullWidth
//               value={userData.email}
//               onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//             />
//             <Select
//               margin="dense"
//               label="Role"
//               fullWidth
//               value={userData.role}
//               onChange={(e) => setUserData({ ...userData, role: e.target.value })}
//             >
//               {roles.map((role) => (
//                 <MenuItem key={role} value={role}>
//                   {role}
//                 </MenuItem>
//               ))}
//             </Select>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleUserClose}>Cancel</Button>
//             <Button onClick={handleUserSave}>Add</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
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
  Tabs,
  Tab,
  AppBar,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputBase,
  MenuItem,
  Select,
  Autocomplete,
  useTheme,
  styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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

export default function EmployeeManagement() {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({ userId: '', department: '', salary: '' });
  const [payrollData, setPayrollData] = useState({ payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
  const [userData, setUserData] = useState({ name: '', email: '', role: 'EMPLOYEE' });
  const [editMode, setEditMode] = useState(false);
  const [payrollEditMode, setPayrollEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('EMPLOYEE');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [employeeInput, setEmployeeInput] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeepayrolls`);
      setPayrolls(response.data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();
    fetchUsers();
  }, []);

  const handleOpen = (employee = null) => {
    setEditMode(Boolean(employee));
    setEmployeeData(employee || { userId: '', department: '', salary: '' });
    setOpen(true);
  };

  const handlePayrollOpen = (payroll = null) => {
    setPayrollEditMode(Boolean(payroll));
    setPayrollData(payroll || { payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
    setPayrollOpen(true);
  };

  const handleUserOpen = () => {
    setUserOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeData({ userId: '', department: '', salary: '' });
    setUserInput('');
  };

  const handlePayrollClose = () => {
    setPayrollOpen(false);
    setPayrollData({ payrollId: '', employeeId: '', salary: '', bonus: '', deductions: '' });
    setEmployeeInput('');
  };

  const handleUserClose = () => {
    setUserOpen(false);
    setUserData({ name: '', email: '', role: 'EMPLOYEE' });
  };

  const handleSave = async () => {
    const user = users.find((u) => u.userId === employeeData.userId);
    if (!user) {
      console.error('User not found!');
      return;
    }

    const payload = {
      user: user,
      department: employeeData.department,
      salary: employeeData.salary,
    };

    try {
      if (editMode) {
        await axios.put(`${API_BASE_URL}/employees/${employeeData.employeeId}/update`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/employees`, payload);
      }
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handlePayrollSave = async () => {
    const employee = employees.find((emp) => emp.employeeId === payrollData.employeeId);
    if (!employee) {
      console.error('Employee not found!');
      return;
    }

    const payload = {
      employee: employee,
      salary: payrollData.salary,
      bonus: payrollData.bonus,
      deductions: payrollData.deductions,
    };

    try {
      if (payrollEditMode) {
        await axios.put(`${API_BASE_URL}/employeepayrolls/${payrollData.payrollId}/update`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/employeepayrolls`, payload);
      }
      fetchPayrolls();
      handlePayrollClose();
    } catch (error) {
      console.error('Error saving payroll:', error);
    }
  };

  const handleUserSave = async () => {
    const defaultPassword = userData.name.substring(0, 4) + '@123';
    const payload = { ...userData, password: defaultPassword };

    try {
      await axios.post(`${API_BASE_URL}/users`, payload);
      fetchUsers();
      handleUserClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await axios.delete(`${API_BASE_URL}/employees/${id}/delete`);
        fetchEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleDeletePayroll = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this payroll?")) {
        await axios.delete(`${API_BASE_URL}/employeepayrolls/${id}/delete`);
        fetchPayrolls();
      }
    } catch (error) {
      console.error('Error deleting payroll:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const filteredEmployees = employees.filter((employee) => {
    const user = users.find((u) => u.userId === employee.userId);
    const matchesSearch = user?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  const filteredPayrolls = payrolls.filter((payroll) => {
    const employee = employees.find((emp) => emp.employeeId === payroll.employeeId);
    const user = users.find((u) => u.userId === employee?.userId);
    return user && (!selectedDepartment || employee.department === selectedDepartment);
  });

  const departments = ['HOUSEKEEPING', 'RECEPTION', 'RESTAURANT'];
  const roles = ['GUEST', 'EMPLOYEE', 'ADMIN'];

  const TabPanel = ({ children, active }) => (
    <Fade in={active} timeout={500}>
      <Box sx={{ display: active ? 'block' : 'none', paddingTop: 0 }}>{children}</Box>
    </Fade>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
          Employee Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1'}`,
            borderRadius: 1,
            p: '4px 12px'
          }}>
            <SearchIcon sx={{ 
              color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
              mr: 1 
            }} />
            <InputBase
              placeholder="Search Employee by Name"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ 
                color: theme.palette.text.primary,
                '& input::placeholder': {
                  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                  opacity: 1
                }
              }}
            />
          </Box>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            displayEmpty
            sx={{ 
              minWidth: 120,
              '& .MuiSelect-select': {
                color: theme.palette.text.primary
              }
            }}
          >
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navbar for Departments */}
        <Box sx={{ 
          width: 240, 
          borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0'}`,
          p: 2,
          backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'
        }}>
          <Typography variant="h6" sx={{ 
            mb: 2,
            color: theme.palette.text.primary,
            fontWeight: 'bold'
          }}>
            Departments
          </Typography>
          <List>
            <ListItem 
              button 
              onClick={() => handleDepartmentSelect('')} 
              sx={{ 
                cursor: 'pointer',
                borderRadius: 1,
                backgroundColor: !selectedDepartment ? 
                  (theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(30, 64, 175, 0.1)') : 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(30, 64, 175, 0.05)'
                }
              }}
            >
              <ListItemText 
                primary="All Employees" 
                primaryTypographyProps={{ 
                  color: theme.palette.text.primary,
                  fontWeight: !selectedDepartment ? 'bold' : 'normal'
                }} 
              />
            </ListItem>
            <Divider sx={{ my: 1, borderColor: theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0' }} />
            {departments.map((department) => (
              <ListItem
                button
                key={department}
                onClick={() => handleDepartmentSelect(department)}
                sx={{ 
                  cursor: 'pointer',
                  borderRadius: 1,
                  backgroundColor: selectedDepartment === department ? 
                    (theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(30, 64, 175, 0.1)') : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(30, 64, 175, 0.05)'
                  }
                }}
              >
                <ListItemText 
                  primary={department} 
                  primaryTypographyProps={{ 
                    color: theme.palette.text.primary,
                    fontWeight: selectedDepartment === department ? 'bold' : 'normal'
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {/* Horizontal Navbar */}
          <AppBar 
            position="static" 
            color="default" 
            sx={{ 
              mb: 3,
              backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
              boxShadow: 'none',
              borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0'}`
            }}
          >
            <StyledTabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <StyledTab label="Employee List" />
              <StyledTab label="Add Employee" />
              <StyledTab label="Payroll Management" />
              <StyledTab label="Add User" />
            </StyledTabs>
          </AppBar>

          {/* Employee List */}
          <TabPanel active={activeTab === 0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: "bold",
                color: theme.palette.text.primary
              }}>
                Employee List
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => handleOpen()}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                Add Employee
              </Button>
            </Box>
            <TableContainer 
              component={Paper} 
              sx={{ 
                border: `1px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0'}`,
                boxShadow: 'none'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
                  }}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Department</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Salary</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((employee) => {
                    const user = users.find((u) => u.userId === employee.userId);
                    return (
                      <StyledTableRow key={employee.employeeId}>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{user?.name}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{user?.email}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{employee.department}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{employee.salary}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              onClick={() => handleOpen(employee)}
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
                              onClick={() => handleDelete(employee.employeeId)}
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Add Employee */}
          <TabPanel active={activeTab === 1}>
            <Box>
              <Button
                variant="contained"
                onClick={() => handleOpen()}
                sx={{
                  mb: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                Add New Employee
              </Button>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Add new employees to your hotel management system here.
              </Typography>
            </Box>
          </TabPanel>

          {/* Payroll Management */}
          <TabPanel active={activeTab === 2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: "bold",
                color: theme.palette.text.primary
              }}>
                Payroll Management
              </Typography>
              <Button
                variant="contained"
                onClick={() => handlePayrollOpen()}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                Add New Payroll
              </Button>
            </Box>
            <TableContainer 
              component={Paper} 
              sx={{ 
                border: `1px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0'}`,
                boxShadow: 'none'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
                  }}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Employee Name</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Department</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Salary</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Bonus</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Deductions</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Total Pay</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayrolls.map((payroll) => {
                    const employee = employees.find((emp) => emp.employeeId === payroll.employeeId);
                    const user = users.find((u) => u.userId === employee?.userId);
                    return (
                      <StyledTableRow key={payroll.payrollId}>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{user?.name}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{user?.email}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{employee?.department}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{payroll.salary}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{payroll.bonus}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{payroll.deductions}</TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary }}>{payroll.salary + payroll.bonus - payroll.deductions}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                              onClick={() => handlePayrollOpen(payroll)}
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
                              onClick={() => handleDeletePayroll(payroll.payrollId)}
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Add User */}
          <TabPanel active={activeTab === 3}>
            <Box>
              <Button
                variant="contained"
                onClick={handleUserOpen}
                sx={{
                  mb: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                Add New User
              </Button>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Add new users to your hotel management system here.
              </Typography>
            </Box>
          </TabPanel>

          {/* Dialog for Add/Edit Employee */}
          <Dialog 
            open={open} 
            onClose={handleClose} 
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'none',
              }
            }}
          >
            <DialogTitle sx={{ color: theme.palette.text.primary }}>
              {editMode ? 'Edit Employee' : 'Add Employee'}
            </DialogTitle>
            <DialogContent>
              <Autocomplete
                options={users.filter((user) => user.role !== 'GUEST')}
                getOptionLabel={(user) => `${user.name} (${user.email})`}
                value={users.find((user) => user.userId === employeeData.userId) || null}
                onChange={(event, newValue) => {
                  setEmployeeData({ ...employeeData, userId: newValue ? newValue.userId : '' });
                }}
                inputValue={userInput}
                onInputChange={(event, newInputValue) => {
                  setUserInput(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search user by name or email"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                      style: { color: theme.palette.text.secondary },
                    }}
                  />
                )}
                sx={{ mt: 1 }}
              />
              <Select
                margin="dense"
                fullWidth
                value={employeeData.department}
                onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
                sx={{ mb: 2 }}
                displayEmpty
                renderValue={(selected) => selected || 'Select Department'}
                inputProps={{
                  style: { color: theme.palette.text.primary },
                }}
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                margin="dense"
                placeholder="Enter Salary"
                type="number"
                fullWidth
                value={employeeData.salary}
                onChange={(e) => setEmployeeData({ ...employeeData, salary: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose}
                sx={{ color: theme.palette.text.primary }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                {editMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for Add/Edit Payroll */}
          <Dialog 
            open={payrollOpen} 
            onClose={handlePayrollClose} 
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'none',
              }
            }}
          >
            <DialogTitle sx={{ color: theme.palette.text.primary }}>
              {payrollEditMode ? 'Edit Payroll' : 'Add Payroll'}
            </DialogTitle>
            <DialogContent>
              <Autocomplete
                options={employees}
                getOptionLabel={(employee) => {
                  const user = users.find((u) => u.userId === employee.userId);
                  return user ? `${user.name} (${user.email})` : 'Unknown';
                }}
                value={employees.find((emp) => emp.employeeId === payrollData.employeeId) || null}
                onChange={(event, newValue) => {
                  setPayrollData({ ...payrollData, employeeId: newValue ? newValue.employeeId : '' });
                }}
                inputValue={employeeInput}
                onInputChange={(event, newInputValue) => {
                  setEmployeeInput(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search employee by name or email"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                      style: { color: theme.palette.text.secondary },
                    }}
                  />
                )}
                sx={{ mt: 1 }}
              />
              <TextField
                margin="dense"
                placeholder="Enter Salary"
                type="number"
                fullWidth
                value={payrollData.salary}
                onChange={(e) => setPayrollData({ ...payrollData, salary: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
              <TextField
                margin="dense"
                placeholder="Enter Bonus"
                type="number"
                fullWidth
                value={payrollData.bonus}
                onChange={(e) => setPayrollData({ ...payrollData, bonus: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
              <TextField
                margin="dense"
                placeholder="Enter Deductions"
                type="number"
                fullWidth
                value={payrollData.deductions}
                onChange={(e) => setPayrollData({ ...payrollData, deductions: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handlePayrollClose}
                sx={{ color: theme.palette.text.primary }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayrollSave}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                {payrollEditMode ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for Add User */}
          <Dialog 
            open={userOpen} 
            onClose={handleUserClose} 
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'none',
              }
            }}
          >
            <DialogTitle sx={{ color: theme.palette.text.primary }}>Add User</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              />
              <Select
                margin="dense"
                label="Role"
                fullWidth
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                sx={{ mt: 1 }}
                inputProps={{
                  style: { color: theme.palette.text.primary },
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary },
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleUserClose}
                sx={{ color: theme.palette.text.primary }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUserSave}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e40af' : '#1e40af',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1d4ed8' : '#1d4ed8',
                  }
                }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}