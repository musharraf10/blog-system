import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpcomingEvent = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const SERVER = import.meta.env.VITE_BACKENDSERVERNAME;

    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch all events
    const fetchEvents = () => {
        axios.get(`${SERVER}/events/upcomingEvent`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    // Handle Form Submission (Add / Edit)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title || !description || !date) {
            alert("Please fill in all fields!");
            return;
        }

        const updatedEvent = { title, description, date };

        if (editingEvent) {
            axios.put(`${SERVER}/events/upcomingEvent/${editingEvent._id}`, updatedEvent)
                .then(() => {
                    alert("Changes Updated");
                    fetchEvents();
                    resetForm();
                })
                .catch((err) => console.log("Error updating event:", err));
        } else {
            axios.post(`${SERVER}/events/upcomingEvent`, updatedEvent)
                .then(() => {
                    fetchEvents();
                    resetForm();
                })
                .catch((err) => console.log("Error adding event:", err));
        }
    };

    // Function to reset form
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setEditingEvent(null);
        document.getElementById("closeModal").click();
    };

    // Handle Edit Click
    const handleEditClick = (event) => {
        setEditingEvent(event);
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date.split('T')[0]); // Formatting date for input field
    };

    // Function to calculate time remaining
    const getTimeRemaining = (eventDate) => {
        const now = new Date();
        const eventTime = new Date(eventDate);
        const diff = eventTime - now;

        if (diff <= 0) return "Event has started";

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
        if (hours > 0) return `Within ${hours} hour${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `Within ${minutes} minute${minutes > 1 ? 's' : ''}`;
        return `Within ${seconds} second${seconds > 1 ? 's' : ''}`;
    };

    return (
        <div className="container-fluid py-5">
            <h1 className="display-4 text-center fw-bold mb-4" style={{ color: "#1E3A8A" }}>
                Upcoming Events - {data.length}
            </h1>

            <button className='btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add New Event
            </button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editingEvent ? "Edit Event" : "Add Event"}</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type='text' 
                                    placeholder='Title' 
                                    className='form-control mb-3' 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea 
                                    placeholder='Description' 
                                    className='form-control mb-3' 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                ></textarea>
                                <input 
                                    type='date' 
                                    className='form-control mb-3' 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary w-100 text-dark">
                                    {editingEvent ? "Update Event" : "Save Event"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                {data.map((item) => (
                    <div key={item._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card border-0 rounded-4" style={{ height: "250px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
                            <div className="card-header text-white text-center fw-bold rounded-top" style={{ background: "linear-gradient(to right, #1E3A8A, #3B82F6)", padding: "15px" }}>
                                {item.title}
                            </div>
                            <div className="card-body text-center" style={{ flex: 1, overflowY: "auto", padding: "10px", maxHeight: "200px" }}>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="text-dark text-center rounded-bottom mb-3">
    <strong>Time Remaining:</strong> {getTimeRemaining(item.date)}
    <h4 className="fw-bold">Event On</h4>
    <p>{new Date(item.date).toLocaleDateString()}</p>
</div>

                            <div className='card-footer'><button className="btn btn-primary btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(item)}>
                                Edit
                            </button>
                            <button className='btn btn-danger btn-sm mt-2 mx-2'>Delete</button>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvent;
