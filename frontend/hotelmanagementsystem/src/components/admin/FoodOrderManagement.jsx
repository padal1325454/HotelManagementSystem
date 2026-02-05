// import React, { useState, useEffect } from 'react';
// import {
//   Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Chip,
//   Snackbar, Alert, IconButton, Tabs, Tab
// } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// export default function FoodOrderManagement() {
//   const [orders, setOrders] = useState([]);
//   const [menu, setMenu] = useState([]);
//   const [guests, setGuests] = useState([]);
//   const [tab, setTab] = useState(0);
//   const [openOrderDialog, setOpenOrderDialog] = useState(false);
//   const [openMenuDialog, setOpenMenuDialog] = useState(false);
//   const [orderData, setOrderData] = useState({ orderId: null, guestId: '', menuItemId: '', quantity: 1, totalAmount: 0, status: 'PENDING' });
//   const [menuData, setMenuData] = useState({ menuItemId: null, name: '', description: '', price: '' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/foodorders`);
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchMenu = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/menuitems`);
//       setMenu(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchGuests = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/guests`);
//       setGuests(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchMenu();
//     fetchGuests();
//   }, []);

//   const handleOpenMenuDialog = (menuItem = null) => {
//     setEditMode(!!menuItem);
//     setMenuData(menuItem || { menuItemId: null, name: '', description: '', price: '' });
//     setOpenMenuDialog(true);
//   };

//   const handleMenuSave = async () => {
//     try {
//       const method = editMode ? 'put' : 'post';
//       const url = editMode ? `${API_BASE_URL}/menuitems/${menuData.menuItemId}` : `${API_BASE_URL}/menuitems`;
//       await axios[method](url, menuData);
//       fetchMenu();
//       setOpenMenuDialog(false);
//       setSnackbar({ open: true, message: 'Menu item saved successfully!', severity: 'success' });
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: 'Failed to save menu item.', severity: 'error' });
//     }
//   };

//   const handleDeleteMenuItem = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/menuitems/${id}`);
//       fetchMenu();
//       setSnackbar({ open: true, message: 'Menu item deleted.', severity: 'info' });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteOrder = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/foodorders/${id}`);
//       fetchOrders();
//       setSnackbar({ open: true, message: 'Order deleted.', severity: 'info' });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleOpenOrderDialog = (order = null) => {
//     setEditMode(!!order);
//     setOrderData(order || { orderId: null, guestId: '', menuItemId: '', quantity: 1, totalAmount: 0, status: 'PENDING' });
//     setOpenOrderDialog(true);
//   };

//   const handleCloseOrderDialog = () => setOpenOrderDialog(false);
//   const handleCloseMenuDialog = () => setOpenMenuDialog(false);

//   const handleOrderSave = async () => {
//     try {
//       const item = menu.find(m => m.menuItemId === parseInt(orderData.menuItemId));
//       if (!item || orderData.quantity < 1 || !orderData.guestId) {
//         setSnackbar({ open: true, message: 'Please select guest, menu item and valid quantity.', severity: 'warning' });
//         return;
//       }
//       const total = item.price * orderData.quantity;
//       const payload = { ...orderData, totalAmount: total };
//       const url = editMode ? `${API_BASE_URL}/foodorders/${orderData.orderId}/update` : `${API_BASE_URL}/foodorders`;
//       const method = editMode ? 'put' : 'post';
//       await axios[method](url, payload);
//       fetchOrders();
//       handleCloseOrderDialog();
//       setSnackbar({ open: true, message: 'Order saved successfully!', severity: 'success' });
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: 'Failed to save order', severity: 'error' });
//     }
//   };

//   const renderGuestSelector = () => (
//     <TextField label="Guest" select fullWidth margin="dense" value={orderData.guestId} onChange={(e) => setOrderData({ ...orderData, guestId: e.target.value })}>
//       {guests.map((g) => (
//         <MenuItem key={g.guestId} value={g.guestId}>
//           {g.guestId} - {g.firstName} {g.lastName}
//         </MenuItem>
//       ))}
//     </TextField>
//   );

//   const filteredOrders = orders.filter(order =>
//     (searchTerm === '' || String(order.orderId).includes(searchTerm)) &&
//     (statusFilter === '' || order.status === statusFilter)
//   );

//   return (
//     <Box p={3} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
//       <Typography variant="h4" gutterBottom fontWeight={700}>🍽️ Food Management (Admin)</Typography>

//       <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
//         <Tab label="Orders" />
//         <Tab label="Menu Items" />
//       </Tabs>

//       {tab === 0 && (
//         <>
//           <Box display="flex" gap={2} mb={3} alignItems="center">
//             <TextField label="Search Orders" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth />
//             <TextField label="Status" select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: 200 }}>
//               <MenuItem value="">All</MenuItem>
//               {['PENDING', 'DELIVERED', 'CANCELLED'].map(status => (
//                 <MenuItem key={status} value={status}>{status}</MenuItem>
//               ))}
//             </TextField>
//             <Button startIcon={<AddCircleOutlineIcon />} variant="contained" onClick={() => handleOpenOrderDialog()}>Add Order</Button>
//           </Box>

//           <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#ececec' }}>
//                 <TableRow>
//                   <TableCell>Order ID</TableCell>
//                   <TableCell>Guest ID</TableCell>
//                   <TableCell>Booking ID</TableCell>
//                   <TableCell>Menu Item</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Total ₹</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredOrders.map((order) => (
//                   <TableRow key={order.orderId} hover>
//                     <TableCell>{order.orderId}</TableCell>
//                     <TableCell>{order.guestId}</TableCell>
//                     <TableCell>{order.bookingId}</TableCell>
//                     <TableCell>{menu.find(m => m.menuItemId === order.menuItemId)?.name || order.menuItemId}</TableCell>
//                     <TableCell>{order.quantity}</TableCell>
//                     <TableCell>₹{order.totalAmount}</TableCell>
//                     <TableCell>
//                       <Chip label={order.status} color={order.status === 'DELIVERED' ? 'success' : order.status === 'PENDING' ? 'warning' : 'default'} />
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton onClick={() => handleOpenOrderDialog(order)} color="primary"><EditIcon /></IconButton>
//                       <IconButton onClick={() => handleDeleteOrder(order.orderId)} color="error"><DeleteIcon /></IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </>
//       )}

//       {tab === 1 && (
//         <>
//           <Box display="flex" justifyContent="flex-end" mb={2}>
//             <Button startIcon={<AddCircleOutlineIcon />} variant="contained" onClick={() => handleOpenMenuDialog()}>Add Menu Item</Button>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#ececec' }}>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {menu.map((item) => (
//                   <TableRow key={item.menuItemId}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell>{item.description}</TableCell>
//                     <TableCell>₹{item.price}</TableCell>
//                     <TableCell align="center">
//                       <IconButton onClick={() => handleOpenMenuDialog(item)} color="primary"><EditIcon /></IconButton>
//                       <IconButton onClick={() => handleDeleteMenuItem(item.menuItemId)} color="error"><DeleteIcon /></IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </>
//       )}

//       {/* Order Dialog */}
//       <Dialog open={openOrderDialog} onClose={handleCloseOrderDialog} fullWidth>
//         <DialogTitle>{editMode ? 'Edit Order' : 'Add Order'}</DialogTitle>
//         <DialogContent>
//           {renderGuestSelector()}
//           <TextField label="Menu Item" select fullWidth margin="dense" value={orderData.menuItemId} onChange={(e) => setOrderData({ ...orderData, menuItemId: e.target.value })}>
//             {menu.map(item => (
//               <MenuItem key={item.menuItemId} value={item.menuItemId}>{item.name} - ₹{item.price}</MenuItem>
//             ))}
//           </TextField>
//           <TextField label="Quantity" type="number" fullWidth margin="dense" value={orderData.quantity} onChange={(e) => setOrderData({ ...orderData, quantity: parseInt(e.target.value) })} />
//           <TextField label="Status" select fullWidth margin="dense" value={orderData.status} onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}>
//             {['PENDING', 'DELIVERED', 'CANCELLED'].map(status => (
//               <MenuItem key={status} value={status}>{status}</MenuItem>
//             ))}
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseOrderDialog}>Cancel</Button>
//           <Button variant="contained" onClick={handleOrderSave}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Menu Dialog */}
//       <Dialog open={openMenuDialog} onClose={handleCloseMenuDialog} fullWidth>
//         <DialogTitle>{editMode ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" fullWidth margin="dense" value={menuData.name} onChange={(e) => setMenuData({ ...menuData, name: e.target.value })} />
//           <TextField label="Description" fullWidth margin="dense" value={menuData.description} onChange={(e) => setMenuData({ ...menuData, description: e.target.value })} />
//           <TextField label="Price" type="number" fullWidth margin="dense" value={menuData.price} onChange={(e) => setMenuData({ ...menuData, price: parseFloat(e.target.value) })} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseMenuDialog}>Cancel</Button>
//           <Button variant="contained" onClick={handleMenuSave}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Chip,
  Snackbar, Alert, Tabs, Tab
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export default function FoodOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState(0);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openMenuDialog, setOpenMenuDialog] = useState(false);
  const [orderData, setOrderData] = useState({
    guestId: '',
    bookingId: '',
    status: 'PENDING',
    items: [{ menuItemId: '', quantity: 1 }]
  });
  const [menuData, setMenuData] = useState({ name: '', description: '', price: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchOrders();
    fetchMenu();
    fetchGuests();
    fetchBookings();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_BASE_URL}/foodorders`);
    setOrders(res.data);
  };

  const fetchMenu = async () => {
    const res = await axios.get(`${API_BASE_URL}/menuitems`);
    setMenu(res.data);
  };

  const fetchGuests = async () => {
    const res = await axios.get(`${API_BASE_URL}/guests`);
    setGuests(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get(`${API_BASE_URL}/bookings`);
    setBookings(res.data);
  };

  const getGuestsWithActiveBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    const activeBookings = bookings.filter(b =>
      new Date(b.checkIn) <= new Date(today) && new Date(b.checkOut) >= new Date(today)
    );
    const guestMap = {};
    activeBookings.forEach(b => {
      if (!guestMap[b.guestId]) guestMap[b.guestId] = b;
    });
    return Object.entries(guestMap).map(([guestId, booking]) => ({
      guestId: parseInt(guestId),
      guestName: guests.find(g => g.guestId === parseInt(guestId))?.firstName || 'Guest',
      bookingId: booking.bookingId
    }));
  };

  const handleGuestSelect = (guestId) => {
    const selectedBooking = bookings.find(b =>
      b.guestId === parseInt(guestId) &&
      new Date(b.checkIn) <= new Date() &&
      new Date(b.checkOut) >= new Date()
    );
  
    setOrderData(prev => ({
      ...prev,
      guestId: guestId,
      bookingId: selectedBooking?.bookingId || ''  // 💥 This was the key fix
    }));
  };
  

  const handleOpenOrderDialog = () => {
    setOrderData({
      guestId: '',
      bookingId: '',
      status: 'PENDING',
      items: [{ menuItemId: '', quantity: 1 }]
    });
    setOpenOrderDialog(true);
  };

  const handleAddItemRow = () => {
    setOrderData(prev => ({
      ...prev,
      items: [...prev.items, { menuItemId: '', quantity: 1 }]
    }));
  };

  const handleRemoveItemRow = (index) => {
    const newItems = [...orderData.items];
    newItems.splice(index, 1);
    setOrderData({ ...orderData, items: newItems });
  };

  const handleOrderSave = async () => {
    if (!orderData.guestId || !orderData.bookingId) {
      setSnackbar({ open: true, message: 'Select guest and booking.', severity: 'error' });
      return;
    }
  
    const payload = {
      guestId: parseInt(orderData.guestId),
      bookingId: parseInt(orderData.bookingId),
      status: orderData.status,
      items: orderData.items.map(item => ({
        menuItemId: parseInt(item.menuItemId),
        quantity: item.quantity
      }))
    };
  
    try {
      await axios.post(`${API_BASE_URL}/foodorders/complete`, payload);
      fetchOrders();
      setOpenOrderDialog(false);
      setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Order failed! Check inputs.', severity: 'error' });
    }
  };
  

  const handleMenuItemSave = async () => {
    try {
      await axios.post(`${API_BASE_URL}/menuitems`, {
        name: menuData.name,
        description: menuData.description,
        price: parseFloat(menuData.price)
      });
      fetchMenu();
      setOpenMenuDialog(false);
      setSnackbar({ open: true, message: 'Menu item added!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to add menu item', severity: 'error' });
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>🍽️ Food Management (Admin)</Typography>

      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
        <Tab label="Orders" />
        <Tab label="Menu Items" />
      </Tabs>

      {tab === 0 && (
        <>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Button variant="contained" onClick={handleOpenOrderDialog} startIcon={<AddCircleOutlineIcon />}>Add Order</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.guestId}</TableCell>
                    <TableCell>{order.bookingId}</TableCell>
                    <TableCell><Chip label={order.status} color="info" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tab === 1 && (
        <>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button startIcon={<AddCircleOutlineIcon />} variant="contained" onClick={() => setOpenMenuDialog(true)}>Add Menu Item</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.map(item => (
                  <TableRow key={item.menuItemId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Order Dialog */}
      <Dialog open={openOrderDialog} onClose={() => setOpenOrderDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Place New Order</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Guest"
            fullWidth
            margin="dense"
            value={orderData.guestId}
            onChange={(e) => handleGuestSelect(e.target.value)}
          >
            {getGuestsWithActiveBookings().map(g => (
              <MenuItem key={g.guestId} value={g.guestId}>
                {g.guestName} (Booking #{g.bookingId})
              </MenuItem>
            ))}
          </TextField>

          <TextField label="Booking ID" value={orderData.bookingId} margin="dense" fullWidth disabled />

          <TextField
            select
            label="Status"
            value={orderData.status}
            onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
            fullWidth
            margin="dense"
          >
            {['PENDING', 'DELIVERED', 'CANCELLED'].map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>

          {orderData.items.map((item, idx) => (
            <Box key={idx} display="flex" gap={1} alignItems="center" mt={2}>
              <TextField
                select
                label="Menu Item"
                value={item.menuItemId}
                onChange={(e) => {
                  const newItems = [...orderData.items];
                  newItems[idx].menuItemId = e.target.value;
                  setOrderData({ ...orderData, items: newItems });
                }}
                sx={{ flex: 2 }}
              >
                {menu.map(m => (
                  <MenuItem key={m.menuItemId} value={m.menuItemId}>{m.name} - ₹{m.price}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Qty"
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...orderData.items];
                  newItems[idx].quantity = parseInt(e.target.value) || 1;
                  setOrderData({ ...orderData, items: newItems });
                }}
                sx={{ width: 100 }}
              />
              <Button onClick={() => handleRemoveItemRow(idx)} disabled={orderData.items.length === 1}>❌</Button>
            </Box>
          ))}
          <Button onClick={handleAddItemRow} sx={{ mt: 2 }}>+ Add Item</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOrderDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleOrderSave}>Submit Order</Button>
        </DialogActions>
      </Dialog>

      {/* Menu Dialog */}
      <Dialog open={openMenuDialog} onClose={() => setOpenMenuDialog(false)} fullWidth>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={menuData.name} onChange={(e) => setMenuData({ ...menuData, name: e.target.value })} />
          <TextField label="Description" fullWidth margin="dense" value={menuData.description} onChange={(e) => setMenuData({ ...menuData, description: e.target.value })} />
          <TextField label="Price" type="number" fullWidth margin="dense" value={menuData.price} onChange={(e) => setMenuData({ ...menuData, price: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMenuDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleMenuItemSave}>Add Item</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}


