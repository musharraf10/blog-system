import React, { useState } from "react";
import { Container, Button, Tabs, Tab, Box, Typography, Card, CardContent, Grid, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Analytics from "./contentEditor/Analytics";

const Dashboard = () => {
  const [selectedTime, setSelectedTime] = useState("today");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());

  const timeFilters = ["today", "yesterday", "monthYear"];
  const subCategories = ["All", "Articles", "Videos", "Tutorials", "Webinars"];

  const categoryData = {
    today: {
      Articles: [{ name: "Total", count: 10 }, { name: "Posted", count: 5 }, { name: "Pending", count: 3 }, { name: "Verified", count: 1 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 0 }],
      Videos: [{ name: "Total", count: 20 }, { name: "Posted", count: 10 }, { name: "Pending", count: 5 }, { name: "Verified", count: 3 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 1 }],
      Tutorials: [{ name: "Total", count: 15 }, { name: "Posted", count: 7 }, { name: "Pending", count: 4 }, { name: "Verified", count: 2 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 1 }],
      Webinars: [{ name: "Total", count: 5 }, { name: "Posted", count: 2 }, { name: "Pending", count: 1 }, { name: "Verified", count: 1 }, { name: "Rejected", count: 0 }, { name: "Scheduled", count: 1 }],
    },
    yesterday: {
      Articles: [{ name: "Total", count: 8 }, { name: "Posted", count: 4 }, { name: "Pending", count: 2 }, { name: "Verified", count: 1 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 0 }],
      Videos: [{ name: "Total", count: 18 }, { name: "Posted", count: 9 }, { name: "Pending", count: 4 }, { name: "Verified", count: 3 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 1 }],
      Tutorials: [{ name: "Total", count: 12 }, { name: "Posted", count: 6 }, { name: "Pending", count: 3 }, { name: "Verified", count: 2 }, { name: "Rejected", count: 0 }, { name: "Scheduled", count: 1 }],
      Webinars: [{ name: "Total", count: 4 }, { name: "Posted", count: 2 }, { name: "Pending", count: 1 }, { name: "Verified", count: 1 }, { name: "Rejected", count: 0 }, { name: "Scheduled", count: 0 }],
    },
    monthYear: {
      Articles: [{ name: "Total", count: 30 }, { name: "Posted", count: 15 }, { name: "Pending", count: 8 }, { name: "Verified", count: 4 }, { name: "Rejected", count: 2 }, { name: "Scheduled", count: 1 }],
      Videos: [{ name: "Total", count: 40 }, { name: "Posted", count: 20 }, { name: "Pending", count: 10 }, { name: "Verified", count: 6 }, { name: "Rejected", count: 2 }, { name: "Scheduled", count: 2 }],
      Tutorials: [{ name: "Total", count: 25 }, { name: "Posted", count: 12 }, { name: "Pending", count: 6 }, { name: "Verified", count: 4 }, { name: "Rejected", count: 1 }, { name: "Scheduled", count: 2 }],
      Webinars: [{ name: "Total", count: 10 }, { name: "Posted", count: 5 }, { name: "Pending", count: 2 }, { name: "Verified", count: 2 }, { name: "Rejected", count: 0 }, { name: "Scheduled", count: 1 }],
    },
  };

  const getFilteredData = () => {
    if (selectedSubCategory === "All") {
      return Object.values(categoryData[selectedTime]).flat().reduce((acc, item) => {
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

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Box display="flex" justifyContent="center" gap={2} my={2}>
            {timeFilters.map((time) => (
              <Button key={time} variant={selectedTime === time ? "contained" : "outlined"} onClick={() => { setSelectedTime(time); setSelectedSubCategory("All"); }}>
                {time === "monthYear" ? "Month/Year" : time.charAt(0).toUpperCase() + time.slice(1)}
              </Button>
            ))}
          </Box>
  
          {selectedTime === "monthYear" && (
            <Box display="flex" justifyContent="center" gap={2} my={2}>
              <DatePicker
                views={["year", "month", "day"]}
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                views={["year", "month", "day"]}
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          )}
  
          <Tabs value={selectedSubCategory} onChange={(e, newValue) => setSelectedSubCategory(newValue)} centered>
            {subCategories.map((sub, index) => (
              <Tab key={index} label={sub} value={sub} />
            ))}
          </Tabs>
  
          <Grid container spacing={2} justifyContent="center" mt={2}>
            {getFilteredData().map((category, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Card sx={{ textAlign: "center", p: 1, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle1" color="primary" fontWeight="bold">{category.name}</Typography>
                      <Typography variant="h6" color="green">{category.count}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </LocalizationProvider>
            <br></br>
      {/* Wrapped Analytics inside the fragment */}
      <div>
      <Analytics />
      </div>
    </>
  );
}  

export default Dashboard;
