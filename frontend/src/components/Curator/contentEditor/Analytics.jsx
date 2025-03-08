// import React from "react";
// import { Card, CardContent, Typography, Grid } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// // Consistent color scheme for both charts
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

// const data = [
//   { name: "Posted", value: 15 },
//   { name: "Pending", value: 8 },
//   { name: "Verified", value: 4 },
//   { name: "Rejected", value: 2 },
//   { name: "Scheduled", value: 1 },
// ];

// const Analytics = () => {
//   return (
//     <div>
//       {/* Analytics Overview Heading */}
//       <Typography variant="h5" align="center" sx={{ color: "blue", mb: 2 }}>
//         Analytics Overview
//       </Typography>

//       <Grid container spacing={2} justifyContent="center">
//         {/* Bar Chart Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" align="center" gutterBottom>
//                 Bar Chart Overview
//               </Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={data}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar
//                     dataKey="value"
//                     barSize={30}
//                     animationBegin={0}
//                     animationDuration={1000}
//                     isAnimationActive
//                   >
//                     {data.map((entry, index) => (
//                       <Cell
//                         key={`bar-cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Pie Chart Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" align="center" gutterBottom>
//                 Pie Chart Overview
//               </Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     innerRadius={40}
//                     dataKey="value"
//                     animationBegin={0}
//                     animationDuration={1000}
//                     isAnimationActive
//                   >
//                     {data.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Analytics;


import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Enhanced color scheme with better contrast
const COLORS = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6"];

// Sample data
const data = [
  { name: "Posted", value: 15 },
  { name: "Pending", value: 8 },
  { name: "Verified", value: 4 },
  { name: "Rejected", value: 2 },
  { name: "Scheduled", value: 1 },
];

const Analytics = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      {/* Analytics Overview Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Analytics Overview</h2>
        <p className="text-gray-600">Summary of content status distribution</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {data.map((item, index) => (
          <div key={`stat-${index}`} className="bg-white rounded-lg shadow-md p-4 text-center transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl font-bold" style={{ color: COLORS[index % COLORS.length] }}>{item.value}</p>
            <p className="text-gray-600 font-medium mt-2">{item.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart Card */}
        <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
          <div className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-xl font-bold text-white">Status Distribution</h3>
              <p className="text-sm text-blue-100">Bar representation of content status</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                  <YAxis tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Bar
                    dataKey="value"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                    animationBegin={0}
                    animationDuration={1500}
                    isAnimationActive
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`bar-cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
          <div className="p-0">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <h3 className="text-xl font-bold text-white">Percentage Breakdown</h3>
              <p className="text-sm text-purple-100">Proportional view of content status</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    isAnimationActive
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    }} 
                    formatter={(value, name) => [`${value} items`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Key Insights</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <p>Most content items are in the "Posted" status (50%)</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <p>"Pending" items account for 27% of all content</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
            <p>Only 7% of content is currently "Rejected"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;