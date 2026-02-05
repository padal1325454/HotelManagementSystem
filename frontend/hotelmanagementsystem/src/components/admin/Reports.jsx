import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function Reports() {
  const [reportType, setReportType] = useState('Revenue');
  const [reports, setReports] = useState([
    { id: 1, type: 'Revenue', details: 'Total revenue for March: $50,000', date: '2025-03-15' },
    { id: 2, type: 'Occupancy', details: 'Average occupancy rate for March: 85%', date: '2025-03-16' },
    { id: 3, type: 'Feedback', details: 'Average customer satisfaction: 4.5/5', date: '2025-03-17' },
  ]);
  const [filteredReports, setFilteredReports] = useState(reports);
  const [open, setOpen] = useState(false);
  const [newReport, setNewReport] = useState({ type: '', details: '', date: '' });

  const handleReportChange = (event) => {
    setReportType(event.target.value);
    setFilteredReports(reports.filter((report) => report.type === event.target.value));
  };

  const handleAddReport = () => {
    setReports((prev) => [...prev, { ...newReport, id: Date.now() }]);
    setFilteredReports((prev) => [...prev, { ...newReport, id: Date.now() }]);
    setOpen(false);
    setNewReport({ type: '', details: '', date: '' });
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Type,Details,Date']
        .concat(filteredReports.map((r) => `${r.type},${r.details},${r.date}`))
        .join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'reports.csv';
    link.click();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Reports Management
      </Typography>

      {/* Filters Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
          padding: 2,
          borderRadius: 2,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Report Type</InputLabel>
          <Select value={reportType} onChange={handleReportChange}>
            <MenuItem value="Revenue">Revenue</MenuItem>
            <MenuItem value="Occupancy">Occupancy</MenuItem>
            <MenuItem value="Feedback">Feedback</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
          Add Report
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportCSV}>
          Export to CSV
        </Button>
      </Box>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card
              sx={{
                boxShadow: 6,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {report.type}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginY: 1 }}>
                  {report.details}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  Date: {report.date}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Report Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Report</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newReport.type}
              onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
            >
              <MenuItem value="Revenue">Revenue</MenuItem>
              <MenuItem value="Occupancy">Occupancy</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Details"
            fullWidth
            margin="dense"
            value={newReport.details}
            onChange={(e) => setNewReport({ ...newReport, details: e.target.value })}
          />
          <TextField
            label="Date"
            fullWidth
            type="date"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={newReport.date}
            onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddReport} color="primary">
            Add Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
