
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext';
import RoomBooking from './RoomBooking';
import Payments from './Payments';
import FoodOrders from './FoodOrders';
import Housekeeping from './Housekeeping';
import LoyaltyRewards from './LoyaltyRewards';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

// Header background now uses fixed colors based on mode:
// For dark mode, header = '#444444'; for light mode, header = '#f0f0f0'
const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    backgroundColor:
      theme.palette.mode === 'dark' ? '#444444' : '#87CEFA',
  })
);

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(open
        ? {}
        : {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
            },
          }),
    },
  })
);

const NAV_ITEMS = [
  { title: 'Dashboard', segment: '', icon: <DashboardIcon /> },
  { title: 'Profile', segment: 'profile', icon: <PersonIcon /> },
  { title: 'Bookings', segment: 'bookings', icon: <ShoppingCartIcon /> },
  { title: 'Payments', segment: 'payments', icon: <ReceiptIcon /> },
  { title: 'Food Orders', segment: 'food-orders', icon: <RestaurantMenuIcon /> },
  { title: 'Housekeeping', segment: 'housekeeping', icon: <AssignmentIcon /> },
  { title: 'Loyalty Rewards', segment: 'loyalty-rewards', icon: <LoyaltyIcon /> },
];

function ThemeToggleButton({ toggleTheme, themeMode }) {
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {themeMode === 'light' ? <Brightness2Icon /> : <WbSunnyIcon />}
    </IconButton>
  );
}

ThemeToggleButton.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

const DrawerItem = ({ title, segment, icon }) => (
  <ListItem button component={Link} to={`/dashboard/${segment}`}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

DrawerItem.propTypes = {
  title: PropTypes.string.isRequired,
  segment: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

function DrawerHeader({ userName }) {
  const initials = userName
    ? userName.split(' ').map((n) => n.charAt(0)).join('')
    : 'U';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar sx={{ mr: 2 }}>{initials}</Avatar>
      <Typography variant="h6" noWrap>
        {userName}
      </Typography>
    </Box>
  );
}

DrawerHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default function UserDashboard({ userData, onLogout }) {
  const [open, setOpen] = useState(true);
  const { themeMode, toggleTheme } = useThemeContext();
  
  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'dark' && {
        primary: { main: '#8e24aa' },
        background: { default: '#121212', paper: '#1d1d1d' },
        text: { primary: '#e0e0e0', secondary: '#cccccc' },
      }),
    },
  });
  
  const navigate = useNavigate();
  const toggleDrawer = () => setOpen(!open);
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="absolute" open={open}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Hotel Management
            </Typography>
            <ThemeToggleButton toggleTheme={toggleTheme} themeMode={themeMode} />
            <IconButton color="inherit" onClick={onLogout} sx={{ ml: 1 }}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBarStyled>
        <DrawerStyled variant="permanent" open={open}>
          <Box>
            <DrawerHeader userName={userData.name} />
            <Divider />
            <List>
              {NAV_ITEMS.map((item) => (
                <DrawerItem key={item.segment} title={item.title} segment={item.segment} icon={item.icon} />
              ))}
            </List>
          </Box>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="caption">© {new Date().getFullYear()} Hotel Management System</Typography>
          </Box>
        </DrawerStyled>
        <Main open={open}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Box sx={{ p: 3 }}>Welcome to the Dashboard!</Box>} />
              <Route path="profile" element={<Box sx={{ p: 3 }}>User Profile Page</Box>} />
              <Route path="bookings" element={<RoomBooking />} />
              <Route path="payments" element={<Payments />} />
              <Route path="food-orders" element={<FoodOrders />} />
              <Route path="housekeeping" element={<Housekeeping />} />
              <Route path="loyalty-rewards" element={<LoyaltyRewards />} />
            </Routes>
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

UserDashboard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};


