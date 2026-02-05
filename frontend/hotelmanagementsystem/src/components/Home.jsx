
import React, { useState } from 'react';
import { 
  Box, Button, Card, Container, Typography, 
  Grid, Fade, Tabs, Tab, useTheme, useMediaQuery 
} from '@mui/material';
import { 
  Room, Star, EmojiPeople, 
  DarkMode, LightMode 
} from '@mui/icons-material';
import LoginSignupPage from './LoginSignupPage';

const Home = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.7) 100%
          ),
          url(/images/home.jpg) center/cover no-repeat
        `,
        backgroundAttachment: 'fixed', // Creates parallax effect
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '32px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(
              circle at 75% 30%,
              transparent 0%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `,
          zIndex: 1,
        },
        '& > *': {
          position: 'relative',
          zIndex: 2,
        },
        transition: 'all 0.3s ease',
        '@media (max-width: 600px)': {
          background: `
            linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
            url(/images/hotel-lobby-mobile.jpg) center/cover no-repeat
          `,
          backgroundAttachment: 'scroll', // Disable parallax on mobile
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* LEFT SIDE - WELCOME & GUEST MODE */}
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white', textAlign: isMobile ? 'center' : 'left' }}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Luxury Awaits
              </Typography>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Experience world-class hospitality at our premium hotel.
              </Typography>
              
              {!isGuestMode ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsGuestMode(true)}
                    startIcon={<EmojiPeople />}
                    sx={{ mr: 2, mb: 2 }}
                  >
                    Explore as Guest
                  </Button>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    No signup required!
                  </Typography>
                </>
              ) : (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Browse rooms, amenities, and more!
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={() => setIsGuestMode(false)}
                  >
                    Back to Login
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          {/* RIGHT SIDE - LOGIN/SIGNUP CARD */}
          {!isGuestMode && (
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 4,
                  p: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                  Welcome Back
                </Typography>
                
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  centered
                  sx={{ mb: 3 }}
                >
                  <Tab label="Login" />
                  <Tab label="Signup" />
                </Tabs>

                <Fade in={activeTab === 0}>
                  <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
                    <LoginSignupPage isLogin onSubmit={onLogin} />
                  </Box>
                </Fade>
                <Fade in={activeTab === 1}>
                  <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
                    <LoginSignupPage isSignup />
                  </Box>
                </Fade>
              </Card>
            </Grid>
          )}

          {/* GUEST MODE CONTENT */}
          {isGuestMode && (
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" gutterBottom>
                  Featured Rooms
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 2 }}>
                  {[1, 2, 3].map((room) => (
                    <Card key={room} sx={{ minWidth: 200, p: 2 }}>
                      <Typography fontWeight="bold">Deluxe Suite</Typography>
                      <Typography variant="body2">$199/night</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Star color="primary" fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>4.8</Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => setActiveTab(1)}
                >
                  Book Now (Sign Up)
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;