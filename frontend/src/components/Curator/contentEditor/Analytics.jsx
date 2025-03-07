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
    
//     <Card sx={{ p: 2, borderRadius: 3 }}>
//       <CardContent>
//         <Typography variant="h6" align="center" gutterBottom>
//         Analytics Overview
//         </Typography>
//         <Grid container spacing={2} justifyContent="center">
//           {/* Bar Chart with Consistent Colors */}
//           <Grid item xs={12} md={6}>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={data}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar
//                   dataKey="value"
//                   barSize={30}
//                   animationBegin={0}
//                   animationDuration={1000}
//                   isAnimationActive
//                 >
//                   {data.map((entry, index) => (
//                     <Cell
//                       key={`bar-cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Grid>

//           {/* Pie Chart with Matching Colors */}
//           <Grid item xs={12} md={6}>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   innerRadius={40}
//                   dataKey="value"
//                   animationBegin={0}
//                   animationDuration={1000}
//                   isAnimationActive
//                 >
//                   {data.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default Analytics;
import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
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
} from "recharts";

// Consistent color scheme for both charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const data = [
  { name: "Posted", value: 15 },
  { name: "Pending", value: 8 },
  { name: "Verified", value: 4 },
  { name: "Rejected", value: 2 },
  { name: "Scheduled", value: 1 },
];

const Analytics = () => {
  return (
    <div>
      {/* Analytics Overview Heading */}
      <Typography variant="h5" align="center" sx={{ color: "blue", mb: 2 }}>
        Analytics Overview
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Bar Chart Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Bar Chart Overview
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    barSize={30}
                    animationBegin={0}
                    animationDuration={1000}
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
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3}}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Pie Chart Overview
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    //outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                    isAnimationActive
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;