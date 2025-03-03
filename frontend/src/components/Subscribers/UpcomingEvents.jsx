import React, { useState } from 'react'
import {  Typography} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const UpcomingEvents = () => {
    const localizer = momentLocalizer(moment);

        const [events, setEvents] = useState([
            {
                title: 'Webinar: Mastering React in 2025',
                start: new Date(2025, 1, 15, 14, 0),
                end: new Date(2025, 1, 15, 15, 30),
            },
            {
                title: 'Live Q&A: The Future of JavaScript',
                start: new Date(2025, 1, 20, 10, 0),
                end: new Date(2025, 1, 20, 11, 0),
            },
        ]);

        return (
            <>
   <Typography variant="h3" style={{ marginBottom: '20px' }}>
                    Upcoming Live Sessions
                </Typography>
        
            
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                {/* <Typography variant="h3" style={{ marginBottom: '20px' }}>
                    Upcoming Live Sessions
                </Typography> */}
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
            </>
        );
    };



export default UpcomingEvents

