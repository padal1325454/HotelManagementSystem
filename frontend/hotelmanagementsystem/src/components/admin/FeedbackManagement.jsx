
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Avatar,
//   Button,
// } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';

// export default function FeedbackManagement() {
//   const [feedbacks, setFeedbacks] = useState([]);

//   // Fetch feedback (mock API call)
//   useEffect(() => {
//     setFeedbacks([
//       { id: 1, guestName: 'John Doe', rating: 5, comments: 'Excellent service!' },
//       { id: 2, guestName: 'Jane Smith', rating: 3, comments: 'Room cleanliness could be improved.' },
//       { id: 3, guestName: 'Bob Williams', rating: 4, comments: 'Food was great!' },
//       { id: 4, guestName: 'Alice Brown', rating: 2, comments: 'Not satisfied with the service.' },
//       { id: 5, guestName: 'Tom Harris', rating: 1, comments: 'Terrible experience.' },
//       { id: 6, guestName: 'Evelyn Carter', rating: 5, comments: 'Amazing hospitality! Will visit again soon.' },
//       { id: 7, guestName: 'Mark Lee', rating: 4, comments: 'Quick service and delicious food. Really happy!' },
//       { id: 8, guestName: 'Bob Williams', rating: 4, comments: 'Food was great!' },
//       { id: 9, guestName: 'Alice Brown', rating: 2, comments: 'Not satisfied with the service.' },
//       { id: 10, guestName: 'Tom Harris', rating: 1, comments: 'Terrible experience.' },
//       { id: 11, guestName: 'Evelyn Carter', rating: 5, comments: 'Amazing hospitality! Will visit again soon.' },
//       { id: 12, guestName: 'Mark Lee', rating: 4, comments: 'Quick service and delicious food. Really happy!' },
//     ]);
//   }, []);

//   // Calculate review distribution
//   const ratingCounts = {
//     5: feedbacks.filter((feedback) => feedback.rating === 5).length,
//     4: feedbacks.filter((feedback) => feedback.rating === 4).length,
//     3: feedbacks.filter((feedback) => feedback.rating === 3).length,
//     2: feedbacks.filter((feedback) => feedback.rating === 2).length,
//     1: feedbacks.filter((feedback) => feedback.rating === 1).length,
//   };

//   return (
//     <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
//       {/* Total Reviews and Rating Distribution */}
//       <Box sx={{ flex: 1, minWidth: '300px' }}>
//         <Typography variant="h4" gutterBottom>
//           Feedback Management
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             color: 'textSecondary',
//             mb: 2,
//             fontWeight: 'bold',
//           }}
//         >
//           Total Reviews: {feedbacks.length}
//         </Typography>

//         {/* Rating Distribution */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 1,
//             backgroundColor: '#f5f5f5',
//             padding: 2,
//             borderRadius: 2,
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           }}
//         >
//           {[5, 4, 3, 2, 1].map((star) => (
//             <Box
//               key={star}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {Array.from({ length: star }).map((_, index) => (
//                   <StarIcon
//                     key={index}
//                     sx={{
//                       color:
//                         star === 5
//                           ? '#FFD700'
//                           : star === 4
//                           ? '#4CAF50'
//                           : star === 3
//                           ? '#FF9800'
//                           : star === 2
//                           ? '#F44336'
//                           : '#9E9E9E',
//                     }}
//                   />
//                 ))}
//               </Box>
//               <Typography sx={{ fontWeight: 'bold' }}>
//                 {ratingCounts[star]} reviews
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* Feedback List Section */}
//       <Box sx={{ flex: 3, minWidth: '500px' }}>
//         <Grid container spacing={3}>
//           {feedbacks.map((feedback) => (
//             <Grid item xs={12} sm={6} md={4} key={feedback.id}>
//               <Card
//                 sx={{
//                   boxShadow: 3,
//                   height: '250px', // Fixed card size
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <CardContent>
//                   {/* Guest Information */}
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       mb: 2,
//                     }}
//                   >
//                     <Avatar sx={{ mr: 2 }}>
//                       {feedback.guestName[0]} {/* Initial of Name */}
//                     </Avatar>
//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: 'bold', color: '#37474F' }}
//                     >
//                       {feedback.guestName}
//                     </Typography>
//                   </Box>

//                   {/* Star Rating */}
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     {Array.from({ length: feedback.rating }).map((_, index) => (
//                       <StarIcon
//                         key={index}
//                         sx={{
//                           color:
//                             feedback.rating === 5
//                               ? '#FFD700'
//                               : feedback.rating === 4
//                               ? '#4CAF50'
//                               : feedback.rating === 3
//                               ? '#FF9800'
//                               : feedback.rating === 2
//                               ? '#F44336'
//                               : '#9E9E9E',
//                         }}
//                       />
//                     ))}
//                   </Box>

//                   {/* Comments with Scrollbar */}
//                   <Box
//                     sx={{
//                       maxHeight: '80px', // Limits visible content
//                       overflowY: 'auto',
//                       paddingRight: 1,
//                       scrollbarWidth: 'thin',
//                       scrollbarColor: '#BDBDBD #E0E0E0',
//                     }}
//                   >
//                     <Typography variant="body2" color="textSecondary">
//                       {feedback.comments}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     color="secondary"
//                     onClick={() =>
//                       setFeedbacks((prev) =>
//                         prev.filter((item) => item.id !== feedback.id)
//                       )
//                     }
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('');

  // Fetch feedback (mock API call)
  useEffect(() => {
    setFeedbacks([
      { id: 1, guestName: 'John Doe', rating: 5, comments: 'Excellent service!' },
      { id: 2, guestName: 'Jane Smith', rating: 3, comments: 'Room cleanliness could be improved.' },
      { id: 3, guestName: 'Bob Williams', rating: 4, comments: 'Food was great!' },
      { id: 4, guestName: 'Alice Brown', rating: 2, comments: 'Not satisfied with the service.' },
      { id: 5, guestName: 'Tom Harris', rating: 1, comments: 'Terrible experience.' },
      { id: 6, guestName: 'Evelyn Carter', rating: 5, comments: 'Amazing hospitality! Will visit again soon.' },
      { id: 7, guestName: 'Mark Lee', rating: 4, comments: 'Quick service and delicious food. Really happy!' },
    ]);
  }, []);

  // Filter feedback based on the search term
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.guestName.toLowerCase().includes(filter.toLowerCase()) ||
      feedback.comments.toLowerCase().includes(filter.toLowerCase())
  );

  // Calculate review distribution
  const ratingCounts = {
    5: filteredFeedbacks.filter((feedback) => feedback.rating === 5).length,
    4: filteredFeedbacks.filter((feedback) => feedback.rating === 4).length,
    3: filteredFeedbacks.filter((feedback) => feedback.rating === 3).length,
    2: filteredFeedbacks.filter((feedback) => feedback.rating === 2).length,
    1: filteredFeedbacks.filter((feedback) => feedback.rating === 1).length,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      {/* Left Section: Total Reviews, Rating Distribution, and Search */}
      <Box
        sx={{
          width: '30%',
          minWidth: '300px',
          padding: 2,
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Feedback Summary
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#616161',
            fontWeight: 'bold',
          }}
        >
          Total Reviews: {filteredFeedbacks.length}
        </Typography>

        {/* Search Input */}
        <TextField
          label="Search Feedback"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Rating Distribution */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            padding: 2,
            backgroundColor: '#fafafa',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <Box
              key={star}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {Array.from({ length: star }).map((_, index) => (
                  <StarIcon
                    key={index}
                    sx={{
                      color:
                        star === 5
                          ? '#FFD700'
                          : star === 4
                          ? '#4CAF50'
                          : star === 3
                          ? '#FF9800'
                          : star === 2
                          ? '#F44336'
                          : '#9E9E9E',
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                {ratingCounts[star]} reviews
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Section: Guest Reviews */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
          scrollbarWidth: 'thin',
          scrollbarColor: '#BDBDBD #E0E0E0',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BDBDBD',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#E0E0E0',
          },
        }}
      >
        <Grid container spacing={3}>
          {filteredFeedbacks.map((feedback) => (
            <Grid item xs={12} sm={6} md={4} key={feedback.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>
                      {feedback.guestName[0]} {/* Initial of Name */}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', color: '#37474F' }}
                    >
                      {feedback.guestName}
                    </Typography>
                  </Box>

                  {/* Star Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {Array.from({ length: feedback.rating }).map((_, index) => (
                      <StarIcon
                        key={index}
                        sx={{
                          color:
                            feedback.rating === 5
                              ? '#FFD700'
                              : feedback.rating === 4
                              ? '#4CAF50'
                              : feedback.rating === 3
                              ? '#FF9800'
                              : feedback.rating === 2
                              ? '#F44336'
                              : '#9E9E9E',
                        }}
                      />
                    ))}
                  </Box>

                  {/* Comments with Scrollbar */}
                  <Box
                    sx={{
                      maxHeight: '80px',
                      overflowY: 'auto',
                      paddingRight: 1,
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {feedback.comments}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    color="secondary"
                    onClick={() =>
                      setFeedbacks((prev) =>
                        prev.filter((item) => item.id !== feedback.id)
                      )
                    }
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}



