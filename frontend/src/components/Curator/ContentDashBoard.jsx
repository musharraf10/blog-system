// import React, { useState } from "react";
// import {
//   Container,
//   Button,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import Analytics from "./contentEditor/Analytics";

// const Dashboard = () => {
//   const [selectedTime, setSelectedTime] = useState("today");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("All");
//   const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
//   const [endDate, setEndDate] = useState(dayjs());

//   const timeFilters = ["today", "yesterday", "monthYear"];
//   const subCategories = ["All", "Articles", "Videos", "Tutorials", "Webinars"];

//   const categoryData = {
//     today: {
//       Articles: [
//         { name: "Total", count: 10 },
//         { name: "Posted", count: 5 },
//         { name: "Pending", count: 3 },
//         { name: "Verified", count: 1 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 0 },
//       ],
//       Videos: [
//         { name: "Total", count: 20 },
//         { name: "Posted", count: 10 },
//         { name: "Pending", count: 5 },
//         { name: "Verified", count: 3 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 1 },
//       ],
//       Tutorials: [
//         { name: "Total", count: 15 },
//         { name: "Posted", count: 7 },
//         { name: "Pending", count: 4 },
//         { name: "Verified", count: 2 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 1 },
//       ],
//       Webinars: [
//         { name: "Total", count: 5 },
//         { name: "Posted", count: 2 },
//         { name: "Pending", count: 1 },
//         { name: "Verified", count: 1 },
//         { name: "Rejected", count: 0 },
//         { name: "Scheduled", count: 1 },
//       ],
//     },
//     yesterday: {
//       Articles: [
//         { name: "Total", count: 8 },
//         { name: "Posted", count: 4 },
//         { name: "Pending", count: 2 },
//         { name: "Verified", count: 1 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 0 },
//       ],
//       Videos: [
//         { name: "Total", count: 18 },
//         { name: "Posted", count: 9 },
//         { name: "Pending", count: 4 },
//         { name: "Verified", count: 3 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 1 },
//       ],
//       Tutorials: [
//         { name: "Total", count: 12 },
//         { name: "Posted", count: 6 },
//         { name: "Pending", count: 3 },
//         { name: "Verified", count: 2 },
//         { name: "Rejected", count: 0 },
//         { name: "Scheduled", count: 1 },
//       ],
//       Webinars: [
//         { name: "Total", count: 4 },
//         { name: "Posted", count: 2 },
//         { name: "Pending", count: 1 },
//         { name: "Verified", count: 1 },
//         { name: "Rejected", count: 0 },
//         { name: "Scheduled", count: 0 },
//       ],
//     },
//     monthYear: {
//       Articles: [
//         { name: "Total", count: 30 },
//         { name: "Posted", count: 15 },
//         { name: "Pending", count: 8 },
//         { name: "Verified", count: 4 },
//         { name: "Rejected", count: 2 },
//         { name: "Scheduled", count: 1 },
//       ],
//       Videos: [
//         { name: "Total", count: 40 },
//         { name: "Posted", count: 20 },
//         { name: "Pending", count: 10 },
//         { name: "Verified", count: 6 },
//         { name: "Rejected", count: 2 },
//         { name: "Scheduled", count: 2 },
//       ],
//       Tutorials: [
//         { name: "Total", count: 25 },
//         { name: "Posted", count: 12 },
//         { name: "Pending", count: 6 },
//         { name: "Verified", count: 4 },
//         { name: "Rejected", count: 1 },
//         { name: "Scheduled", count: 2 },
//       ],
//       Webinars: [
//         { name: "Total", count: 10 },
//         { name: "Posted", count: 5 },
//         { name: "Pending", count: 2 },
//         { name: "Verified", count: 2 },
//         { name: "Rejected", count: 0 },
//         { name: "Scheduled", count: 1 },
//       ],
//     },
//   };

//   const getFilteredData = () => {
//     if (selectedSubCategory === "All") {
//       return Object.values(categoryData[selectedTime])
//         .flat()
//         .reduce((acc, item) => {
//           let existing = acc.find((el) => el.name === item.name);
//           if (existing) {
//             existing.count += item.count;
//           } else {
//             acc.push({ ...item });
//           }
//           return acc;
//         }, []);
//     }
//     return categoryData[selectedTime][selectedSubCategory] || [];
//   };

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Container>
//           <Box display="flex" justifyContent="center" gap={2} my={2}>
//             {timeFilters.map((time) => (
//               <Button
//                 key={time}
//                 variant={selectedTime === time ? "contained" : "outlined"}
//                 onClick={() => {
//                   setSelectedTime(time);
//                   setSelectedSubCategory("All");
//                 }}
//                 sx={{
//                   borderRadius: "10px",
//                   "&:hover": {
//                     color: "white", // Change text color to white on hover
//                   },
//                 }}
//               >
//                 {time === "monthYear"
//                   ? "Month/Year"
//                   : time.charAt(0).toUpperCase() + time.slice(1)}
//               </Button>
//             ))}
//           </Box>

//           {selectedTime === "monthYear" && (
//             <Box display="flex" justifyContent="center" gap={2} my={2}>
//               <DatePicker
//                 views={["year", "month", "day"]}
//                 label="Start Date"
//                 value={startDate}
//                 onChange={(newValue) => setStartDate(newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//               <DatePicker
//                 views={["year", "month", "day"]}
//                 label="End Date"
//                 value={endDate}
//                 onChange={(newValue) => setEndDate(newValue)}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </Box>
//           )}

//           <Tabs
//             value={selectedSubCategory}
//             onChange={(e, newValue) => setSelectedSubCategory(newValue)}
//             centered
//           >
//             {subCategories.map((sub, index) => (
//               <Tab
//                 key={index}
//                 label={sub}
//                 value={sub}
//                 sx={{
//                   borderRadius: "10px",
//                   "&.Mui-selected": {
//                     color: "black", // Ensure selected tab text color is black
//                   },
//                   "&:hover": {
//                     color: "white", // Change text color to white on hover
//                   },
//                 }}
//               />
//             ))}
//           </Tabs>

//           <Grid container spacing={2} justifyContent="center" mt={2}>
//             {getFilteredData().map((category, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4}>
//                 <motion.div whileHover={{ scale: 1.05 }}>
//                   <Card
//                     sx={{
//                       textAlign: "center",
//                       p: 2,
//                       borderRadius: "15px",
//                       background: "white", // Default background
//                       color: "black", // Default text color
//                       boxShadow: "5px 5px 15px rgba(74, 74, 74, 0.5)", // Light blue shadow
//                       position: "relative",
//                       overflow: "hidden",
//                       transition: "all 2s ease-in-out",
//                       "&:hover": {
//                         boxShadow: "8px 8px 20px rgba(173, 216, 230, 0.7)", // Stronger shadow on hover
//                         background:
//                           "linear-gradient(90deg, #1976D2 0%, #1976D2 100%)", // Smooth blue gradient
//                         color: "white", // Change text color to white on hover
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         {category.name}
//                       </Typography>
//                       <Typography variant="h5">{category.count}</Typography>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </LocalizationProvider>

//       <br />
//       <div style={{ marginTop: "40px" }}>
//         <Analytics />
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Paper,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import TimelineIcon from "@mui/icons-material/Timeline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Analytics from "./contentEditor/Analytics";

const Dashboard = () => {
  const [selectedTime, setSelectedTime] = useState("today");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);

  const timeFilters = ["today", "yesterday", "monthYear"];
  const subCategories = ["All", "Articles", "Videos", "Tutorials", "Webinars"];

  const categoryData = {
    today: {
      Articles: [
        { name: "Total", count: 10 },
        { name: "Posted", count: 5 },
        { name: "Pending", count: 3 },
        { name: "Verified", count: 1 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 0 },
      ],
      Videos: [
        { name: "Total", count: 20 },
        { name: "Posted", count: 10 },
        { name: "Pending", count: 5 },
        { name: "Verified", count: 3 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 1 },
      ],
      Tutorials: [
        { name: "Total", count: 15 },
        { name: "Posted", count: 7 },
        { name: "Pending", count: 4 },
        { name: "Verified", count: 2 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 1 },
      ],
      Webinars: [
        { name: "Total", count: 5 },
        { name: "Posted", count: 2 },
        { name: "Pending", count: 1 },
        { name: "Verified", count: 1 },
        { name: "Rejected", count: 0 },
        { name: "Scheduled", count: 1 },
      ],
    },
    yesterday: {
      Articles: [
        { name: "Total", count: 8 },
        { name: "Posted", count: 4 },
        { name: "Pending", count: 2 },
        { name: "Verified", count: 1 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 0 },
      ],
      Videos: [
        { name: "Total", count: 18 },
        { name: "Posted", count: 9 },
        { name: "Pending", count: 4 },
        { name: "Verified", count: 3 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 1 },
      ],
      Tutorials: [
        { name: "Total", count: 12 },
        { name: "Posted", count: 6 },
        { name: "Pending", count: 3 },
        { name: "Verified", count: 2 },
        { name: "Rejected", count: 0 },
        { name: "Scheduled", count: 1 },
      ],
      Webinars: [
        { name: "Total", count: 4 },
        { name: "Posted", count: 2 },
        { name: "Pending", count: 1 },
        { name: "Verified", count: 1 },
        { name: "Rejected", count: 0 },
        { name: "Scheduled", count: 0 },
      ],
    },
    monthYear: {
      Articles: [
        { name: "Total", count: 30 },
        { name: "Posted", count: 15 },
        { name: "Pending", count: 8 },
        { name: "Verified", count: 4 },
        { name: "Rejected", count: 2 },
        { name: "Scheduled", count: 1 },
      ],
      Videos: [
        { name: "Total", count: 40 },
        { name: "Posted", count: 20 },
        { name: "Pending", count: 10 },
        { name: "Verified", count: 6 },
        { name: "Rejected", count: 2 },
        { name: "Scheduled", count: 2 },
      ],
      Tutorials: [
        { name: "Total", count: 25 },
        { name: "Posted", count: 12 },
        { name: "Pending", count: 6 },
        { name: "Verified", count: 4 },
        { name: "Rejected", count: 1 },
        { name: "Scheduled", count: 2 },
      ],
      Webinars: [
        { name: "Total", count: 10 },
        { name: "Posted", count: 5 },
        { name: "Pending", count: 2 },
        { name: "Verified", count: 2 },
        { name: "Rejected", count: 0 },
        { name: "Scheduled", count: 1 },
      ],
    },
  };

  // Function to get appropriate card color based on category name
  const getCardColor = (name) => {
    switch (name) {
      case "Total":
        return {
          bg: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          hover: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
        };
      case "Posted":
        return {
          bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
          hover: "linear-gradient(135deg, #38ef7d 0%, #11998e 100%)",
        };
      case "Pending":
        return {
          bg: "linear-gradient(135deg, #f46b45 0%, #eea849 100%)",
          hover: "linear-gradient(135deg, #eea849 0%, #f46b45 100%)",
        };
      case "Verified":
        return {
          bg: "linear-gradient(135deg, #009FFD 0%, #2A2A72 100%)",
          hover: "linear-gradient(135deg, #2A2A72 0%, #009FFD 100%)",
        };
      case "Rejected":
        return {
          bg: "linear-gradient(135deg, #CB356B 0%, #BD3F32 100%)",
          hover: "linear-gradient(135deg, #BD3F32 0%, #CB356B 100%)",
        };
      case "Scheduled":
        return {
          bg: "linear-gradient(135deg, #834d9b 0%, #d04ed6 100%)",
          hover: "linear-gradient(135deg, #d04ed6 0%, #834d9b 100%)",
        };
      default:
        return {
          bg: "linear-gradient(90deg, #1976D2 0%, #1976D2 100%)",
          hover: "linear-gradient(90deg, #1976D2 100%, #1976D2 0%)",
        };
    }
  };

  const getFilteredData = () => {
    if (selectedSubCategory === "All") {
      return Object.values(categoryData[selectedTime])
        .flat()
        .reduce((acc, item) => {
          let existing = acc.find((el) => el.name === item.name);
          if (existing) {
            existing.count += item.count;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);
    }
    return categoryData[selectedTime][selectedSubCategory] || [];
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Add loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedTime, selectedSubCategory]);

  // Card animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 3,
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h5" fontWeight="bold" color="primary">
                Content Dashboard
              </Typography>
              {/* <Box>
                <Tooltip title="Refresh Data">
                  <IconButton onClick={handleRefresh} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter Options">
                  <IconButton color="primary">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export Data">
                  <IconButton color="primary">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box> */}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* <Box
              display="flex"
              justifyContent="center"
              gap={2}
              mb={3}
              sx={{ flexWrap: "wrap" }}
            >
              <Button
                startIcon={<CalendarTodayIcon />}
                variant={selectedTime === "today" ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedTime("today");
                  setSelectedSubCategory("All");
                }}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  boxShadow: selectedTime === "today" ? 3 : 0,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                Today
              </Button>
              <Button
                startIcon={<HistoryIcon />}
                variant={selectedTime === "yesterday" ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedTime("yesterday");
                  setSelectedSubCategory("All");
                }}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  boxShadow: selectedTime === "yesterday" ? 3 : 0,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                Yesterday
              </Button>
              <Button
                startIcon={<DateRangeIcon />}
                variant={selectedTime === "monthYear" ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedTime("monthYear");
                  setSelectedSubCategory("All");
                }}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  boxShadow: selectedTime === "monthYear" ? 3 : 0,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                Month/Year
              </Button>
            </Box> */}

            {/* {selectedTime === "monthYear" && (
              <Box
                display="flex"
                justifyContent="center"
                gap={2}
                my={3}
                sx={{ flexWrap: "wrap" }}
              >
                <DatePicker
                  views={["year", "month", "day"]}
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
                <DatePicker
                  views={["year", "month", "day"]}
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
              </Box>
            )} */}

            <Paper
              elevation={1}
              sx={{
                borderRadius: "12px",
                mb: 4,
                overflow: "hidden",
                background: "rgba(250, 250, 250, 0.9)",
              }}
            >
              <Tabs
                value={selectedSubCategory}
                onChange={(e, newValue) => setSelectedSubCategory(newValue)}
                centered
                sx={{
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    background: "linear-gradient(45deg, #1976D2, #64B5F6)",
                  },
                }}
              >
                {subCategories.map((sub, index) => (
                  <Tab
                    key={index}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {sub}
                        {sub !== "All" && (
                          <Chip
                            size="small"
                            label={
                              categoryData[selectedTime][sub].reduce(
                                (sum, item) =>
                                  item.name === "Total" ? sum + item.count : sum,
                                0
                              )
                            }
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              background:
                                selectedSubCategory === sub
                                  ? "#1976D2"
                                  : "#e0e0e0",
                              color: selectedSubCategory === sub ? "#fff" : "",
                            }}
                          />
                        )}
                      </Box>
                    }
                    value={sub}
                    sx={{
                      borderRadius: "10px 10px 0 0",
                      fontWeight: "medium",
                      transition: "all 0.3s",
                      textTransform: "none",
                      "&.Mui-selected": {
                        fontWeight: "bold",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Paper>

            <Grid container spacing={3} justifyContent="center">
              {getFilteredData().map((category, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "16px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        background: getCardColor(category.name).bg,
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s",
                        opacity: isLoading ? 0.7 : 1,
                        "&:hover": {
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                          background: getCardColor(category.name).hover,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mb: 1, opacity: 0.9 }}
                        >
                          {category.name}
                        </Typography>
                        <Typography variant="h3" fontWeight="bold">
                          {isLoading ? (
                            <Box
                              sx={{
                                width: "60%",
                                height: "36px",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "4px",
                                animation: "pulse 1.5s infinite ease-in-out",
                                "@keyframes pulse": {
                                  "0%": { opacity: 0.6 },
                                  "50%": { opacity: 0.3 },
                                  "100%": { opacity: 0.6 },
                                },
                              }}
                            />
                          ) : (
                            category.count
                          )}
                        </Typography>
                        {category.name === "Total" && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mt: 1,
                            }}
                          >
                            <TimelineIcon fontSize="small" />
                            <Typography variant="caption">
                              {selectedSubCategory !== "All"
                                ? selectedSubCategory
                                : "All Categories"}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                      {/* Decorative elements */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -20,
                          right: -20,
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.05)",
                        }}
                      />
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </LocalizationProvider>

      <Box sx={{ mt: 5 }}>
        <Analytics />
      </Box>
    </>
  );
};

export default Dashboard;