import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Alert } from '@mui/material';

export default function LoginSignupPage({ isLogin, isSignup, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (isSignup && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    try {
      if (isLogin) {
        const response = await fetch('http://localhost:8080/api/users/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (response.ok) {
          const data = await response.json();
          onSubmit(data.userId, data.role);
          setMessage({ type: 'success', text: 'Login successful!' });
        } else {
          setMessage({ type: 'error', text: 'Invalid login credentials.' });
        }
      } else if (isSignup) {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'GUEST', //fixed role 
          }),
        });

        if (response.ok) {
          setMessage({ type: 'success', text: 'Signup successful! You can now login.' });
        } else {
          setMessage({ type: 'error', text: 'Signup failed. Please try again.' });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <Box>
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {isSignup && (
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        )}
        {isLogin && (
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="Remember Me"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </form>
    </Box>
  );
}
