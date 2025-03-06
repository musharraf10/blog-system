import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion"; // Import Framer Motion

const data = [
  { name: "Posted", value: 15 },
  { name: "Pending", value: 8 },
  { name: "Verified", value: 4 },
  { name: "Rejected", value: 2 },
  { name: "Scheduled", value: 1 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const Analytics = () => {
  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Analytics Overview
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {/* Left Side - Animated Bar Chart */}
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  barSize={30}
                  animationBegin={0}
                  animationDuration={1000}
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Right Side - Rotating Pie Chart */}
          <Grid item xs={12} md={6}>
            <motion.div
              animate={{ rotate: 360 }} // Continuous rotation
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Infinite loop
            >
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Analytics;
