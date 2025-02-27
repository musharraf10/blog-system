import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, Chip, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Bar, Pie } from 'react-chartjs-2';
import { styled } from '@mui/system';
import axios from 'axios';
import ContentPart from './ContentModerationSub'

// Styled component for mobile responsiveness
const FormContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    form: {
      display: 'block',
    },
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px',
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
  },
}));

const ContentForm = () => {
  const [contentData, setContentData] = useState({
    title: '',
    body: '',
    type: '',
    author_id: '',
    price: 0,
    tags: [],
    status: 'draft',
    publishDate: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [publishedContent, setPublishedContent] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ types: {}, months: {} });

  // useEffect(() => {
  //   // Fetch published content and analytics data from API
  //   async function fetchData() {
  //     const response = await axios.get('/api/content');
  //     const published = response.data.filter(item => item.status === 'published');
  //     setPublishedContent(published);

  //     // Prepare data for analytics
  //     const typesCount = {};
  //     const monthsCount = {};
  //     published.forEach(item => {
  //       typesCount[item.type] = (typesCount[item.type] || 0) + 1;
  //       const month = new Date(item.publishDate).getMonth();
  //       monthsCount[month] = (monthsCount[month] || 0) + 1;
  //     });
  //     setAnalyticsData({ types: typesCount, months: monthsCount });
  //   }
  //   fetchData();
  // }, []);


  useEffect(() => {
    // Dummy data for published content
    const dummyPublishedContent = [
      {
        title: 'How to Use React',
        body: 'This is a guide on using React.',
        type: 'guide',
        author_id: 'user1',
        price: 0,
        tags: ['React', 'JavaScript'],
        status: 'published',
        publishDate: '2023-07-15T10:00:00.000Z',
      },
      {
        title: 'JavaScript Basics',
        body: 'Learn the basics of JavaScript.',
        type: 'article',
        author_id: 'user2',
        price: 10,
        tags: ['JavaScript', 'Programming'],
        status: 'published',
        publishDate: '2023-08-20T14:00:00.000Z',
      },
      {
        title: 'Intro to Node.js',
        body: 'This is an introduction to Node.js.',
        type: 'video',
        author_id: 'user3',
        price: 20,
        tags: ['Node.js', 'Backend'],
        status: 'published',
        publishDate: '2023-09-10T18:30:00.000Z',
      },
      {
        title: 'Building REST APIs',
        body: 'Learn how to build REST APIs.',
        type: 'webinar',
        author_id: 'user4',
        price: 0,
        tags: ['API', 'Backend'],
        status: 'published',
        publishDate: '2023-10-05T09:15:00.000Z',
      },
    ];
  
    // Set the dummy data to the state
    setPublishedContent(dummyPublishedContent);
  
    // Prepare dummy analytics data
    const typesCount = {};
    const monthsCount = {};
    dummyPublishedContent.forEach(item => {
      // Count types
      typesCount[item.type] = (typesCount[item.type] || 0) + 1;
  
      // Count published items by month
      const month = new Date(item.publishDate).getMonth();
      monthsCount[month] = (monthsCount[month] || 0) + 1;
    });
  
    // Set the dummy analytics data
    setAnalyticsData({ types: typesCount, months: monthsCount });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !contentData.tags.includes(tagInput)) {
      setContentData((prevData) => ({ ...prevData, tags: [...prevData.tags, tagInput] }));
      setTagInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/content', contentData);
    // Reset form
    setContentData({
      title: '',
      body: '',
      type: '',
      author_id: '',
      price: 0,
      tags: [],
      status: 'draft',
      publishDate: null,
    });
  };

  const chartData = {
    labels: Object.keys(analyticsData.types),
    datasets: [
      {
        label: 'Content Types',
        data: Object.values(analyticsData.types),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
      },
    ],
  };

  const monthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Published Content',
        data: Object.values(analyticsData.months),
        backgroundColor: '#36a2eb',
      },
    ],
  };

  return (
    <FormContainer>
      <ContentPart/>
      <Card sx={{ padding: 2, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Create New Content</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={contentData.title}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Body"
              variant="outlined"
              name="body"
              value={contentData.body}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={contentData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="article">Article</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="guide">Guide</MenuItem>
                <MenuItem value="webinar">Webinar</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Author ID"
              variant="outlined"
              name="author_id"
              value={contentData.author_id}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              value={contentData.price}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Tags"
              variant="outlined"
              value={tagInput}
              onChange={handleTagInput}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
              {contentData.tags.map((tag, index) => (
                <Chip key={index} label={tag} />
              ))}
            </Box>
            <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
              <RadioGroup row name="status" value={contentData.status} onChange={handleChange}>
                <FormControlLabel value="draft" control={<Radio />} label="Draft" />
                <FormControlLabel value="published" control={<Radio />} label="Published" />
              </RadioGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Publish Date"
                value={contentData.publishDate}
                onChange={(date) => setContentData({ ...contentData, publishDate: date })}
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
              />
            </LocalizationProvider>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

<Typography variant="h6" sx={{ marginBottom: 2, color: 'black' }}>
  Published Content
</Typography>
<TableContainer 
  component={Paper} 
  sx={{ 
    marginBottom: 4, 
    backgroundColor: 'white',
    color: 'black'
  }}
>
  <Table aria-label="published content table">
    <TableHead>
      <TableRow sx={{ backgroundColor: 'black' }}> 
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Publish Date</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tags</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {publishedContent.map((item, index) => (
        <TableRow 
          key={item._id} 
          sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }} 
        >
          <TableCell sx={{ color: 'black' }}>{item.title}</TableCell>
          <TableCell sx={{ color: 'black' }}>{item.type}</TableCell>
          <TableCell sx={{ color: 'black' }}>{item.price}</TableCell>
          <TableCell sx={{ color: 'black' }}>
            {new Date(item.publishDate).toLocaleDateString()}
          </TableCell>
          <TableCell sx={{ color: 'black' }}>{item.tags.join(', ')}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<Box
  sx={{
    marginBottom: 4,
    backgroundColor: 'white', 
    color: 'black', 
    padding: 3,
    borderRadius: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
  }}
>
  <Typography
    variant="h6"
    sx={{
      marginBottom: 2,
      color: 'black', 
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    }}
  >
    Content Analytics
  </Typography>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      width: '100%',
    }}
  >
    <Box
      sx={{
        width: { xs: '90%', md: '40%' }, // Same as Bar Chart
        height: 250, // Reduced height for a smaller Pie Chart
        backgroundColor: 'white', // White background
        padding: 3,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Black glow effect
        transition: 'transform 0.3s ease-in-out', // Smooth transition
        '&:hover': {
          transform: 'scale(1.05)', // Hover effect
        },
      }}
    >
      <Pie
        data={{
          labels: ['Videos', 'Webinars', 'Articles', 'Guides'],
          datasets: [
            {
              data: [40, 20, 30, 10], // Matching proportions
              backgroundColor: ['#000000', '#333333', '#777777', '#aaaaaa'], 
              borderColor: '#ffffff', 
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            legend: {
              position: 'bottom', 
              labels: { 
                color: 'black', 
                font: { size: 14 },
              },
            },
          },
        }}
      />
    </Box>

    <Box
      sx={{
        width: { xs: '90%', md: '40%' },
        height: 250, // Matching height with Pie Chart
        backgroundColor: 'white', // White background
        padding: 3,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
        transition: 'transform 0.3s ease-in-out', // Smooth transition
        '&:hover': {
          transform: 'scale(1.05)', // Hover effect
        },
      }}
    >
      <Bar
        data={{
          labels: ['Videos', 'Webinars', 'Articles', 'Guides'],
          datasets: [
            {
              label: 'Content Count',
              data: [40, 20, 30, 10], 
              backgroundColor: ['#000000', '#333333', '#777777', '#aaaaaa'], // Matching colors
              borderColor: '#ffffff', // White Borders
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allows resizing
          scales: {
            x: {
              ticks: { color: 'black', font: { size: 12 } }, // Black X-axis labels
              grid: { color: '#777777' }, // Slightly darker grid for better visibility
            },
            y: {
              ticks: { color: 'black', font: { size: 12 } }, // Black Y-axis labels
              grid: { color: '#777777' }, // Slightly darker grid
            },
          },
        }}
      />
    </Box>
  </Box>
</Box>


    </FormContainer>
  );
};

export default ContentForm;