
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
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
  Avatar,
  Container,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import EventIcon from '@mui/icons-material/Event';
import StoreIcon from '@mui/icons-material/Store';

import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
    marginLeft: open ? `${drawerWidth}px` : theme.spacing(9),
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin-left', 'padding-left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.mode === 'dark' ? '#0a1929' : '#f8fafc',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.mode === 'dark' ? '#3e5d8e' : '#94a3b8',
      borderRadius: '10px',
      border: theme.palette.mode === 'dark' ? '1px solid #132f4c' : '1px solid #e2e8f0',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.mode === 'dark' ? '#4f7ab7' : '#64748b',
    },
  })
);

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
    backgroundColor: theme.palette.mode === 'dark' ? '#001e3c' : '#1e3a8a',
    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#ffffff',
    boxShadow: 'none',
    borderBottom: theme.palette.mode === 'dark' ? '1px solid #132f4c' : '1px solid #1e40af',
  })
);

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.mode === 'dark' ? '#0a1929' : '#ffffff',
      color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
      borderRight: theme.palette.mode === 'dark' ? '1px solid #132f4c' : '1px solid #e2e8f0',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark' ? '#1e3a8a' : '#94a3b8',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.mode === 'dark' ? '#1e40af' : '#64748b',
      },
      ...(open
        ? {}
        : {
            overflowX: 'hidden',
            width: theme.spacing(9),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
            },
          }),
    },
  })
);

const NAV_ITEMS = [
  { title: 'Room Management', segment: 'rooms', icon: <MeetingRoomIcon /> },
  { title: 'Employee Management', segment: 'employees', icon: <PeopleIcon /> },
  { title: 'Booking Management', segment: 'bookings', icon: <ShoppingCartIcon /> },
  { title: 'Payment Management', segment: 'payments', icon: <ReceiptIcon /> },
  { title: 'Food Orders', segment: 'food-orders', icon: <RestaurantMenuIcon /> },
  { title: 'Housekeeping', segment: 'housekeeping', icon: <AssignmentIcon /> },
  { title: 'Supplier Management', segment: 'supplier', icon: <StoreIcon /> },
  { title: 'Inventory', segment: 'inventory', icon: <InventoryIcon /> },
  { title: 'Feedback', segment: 'feedback', icon: <FeedbackIcon /> },
  { title: 'Loyalty Programs', segment: 'loyalty', icon: <LoyaltyIcon /> },
  { title: 'Event Management', segment: 'events', icon: <EventIcon /> },
  { title: 'Reports', segment: 'reports', icon: <AssessmentIcon /> },
];

function ThemeToggleButton({ toggleTheme, themeMode }) {
  return (
    <Tooltip title={themeMode === 'light' ? 'Dark mode' : 'Light mode'}>
      <IconButton color="inherit" onClick={toggleTheme} sx={{ 
        backgroundColor: themeMode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 58, 138, 0.1)',
        '&:hover': {
          backgroundColor: themeMode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 58, 138, 0.2)',
        }
      }}>
        {themeMode === 'light' ? <Brightness2Icon /> : <WbSunnyIcon />}
      </IconButton>
    </Tooltip>
  );
}

ThemeToggleButton.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

const DrawerHeader = ({ userName }) => {
  const theme = useTheme();
  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('')
    : 'U';
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      p: 2,
      backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
      borderBottom: theme.palette.mode === 'dark' ? '1px solid #1e3a8a' : '1px solid #cbd5e1',
    }}>
      <Avatar sx={{ 
        mr: 2,
        width: 40,
        height: 40,
        backgroundColor: theme.palette.mode === 'dark' ? '#1e3a8a' : '#1e40af',
        color: '#ffffff',
        fontWeight: 'bold',
      }}>
        {initials}
      </Avatar>
      <Typography variant="subtitle1" noWrap sx={{ 
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
      }}>
        {userName}
      </Typography>
    </Box>
  );
};

DrawerHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

const NavListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-root': {
    borderRadius: 6,
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1, 2),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(30, 58, 138, 0.3)' 
        : 'rgba(30, 64, 175, 0.1)',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? '#1e3a8a' 
        : '#1e40af',
      color: '#ffffff',
      '& .MuiListItemIcon-root': {
        color: '#ffffff',
      },
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? '#1e40af' 
        : '#1d4ed8',
    },
  },
  '& .MuiListItemText-primary': {
    color: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
  },
}));

export default function AdminDashboard({ userData, onLogout }) {
  const [open, setOpen] = useState(true);
  const { themeMode, toggleTheme } = useThemeContext();
  const location = useLocation();
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'dark' ? '#1e3a8a' : '#1e40af',
      },
      secondary: {
        main: themeMode === 'dark' ? '#7e22ce' : '#7c3aed',
      },
      background: {
        default: themeMode === 'dark' ? '#0a1929' : '#f8fafc',
        paper: themeMode === 'dark' ? '#0f172a' : '#ffffff',
      },
      text: {
        primary: themeMode === 'dark' ? '#e2e8f0' : '#1e293b',
        secondary: themeMode === 'dark' ? '#94a3b8' : '#64748b',
      },
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = () => setOpen(!open);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        <AppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 600 }}>
              Admin Dashboard
            </Typography>
            <ThemeToggleButton toggleTheme={toggleTheme} themeMode={themeMode} />
            <Tooltip title="Logout">
              <IconButton 
                color="inherit" 
                onClick={onLogout} 
                sx={{ 
                  ml: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBarStyled>
        <DrawerStyled variant="permanent" open={open && isSmUp}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <DrawerHeader userName={userData.name} />
            <Divider sx={{ borderColor: theme.palette.mode === 'dark' ? '#1e3a8a' : '#cbd5e1' }} />
            <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
              <List>
                {NAV_ITEMS.map((item) => (
                  <NavListItem 
                    button 
                    component={Link} 
                    to={`/dashboard/${item.segment}`} 
                    key={item.segment}
                    selected={location.pathname.includes(item.segment)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.title} />}
                  </NavListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ 
              p: 2, 
              textAlign: 'center',
              backgroundColor: theme.palette.mode === 'dark' ? '#132f4c' : '#e2e8f0',
              borderTop: theme.palette.mode === 'dark' ? '1px solid #1e3a8a' : '1px solid #cbd5e1',
            }}>
              <Typography variant="caption" sx={{ 
                color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                fontSize: '0.75rem'
              }}>
                © {new Date().getFullYear()} Hotel Management System
              </Typography>
            </Box>
          </Box>
        </DrawerStyled>
        <Main open={open && isSmUp}>
          <Toolbar />
          <Container 
            maxWidth="xl" 
            sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              py: 3,
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                boxShadow: theme.shadows[1],
                p: 3,
                overflow: 'auto',
              }}
            >
              <Outlet />
            </Box>
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

AdminDashboard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};