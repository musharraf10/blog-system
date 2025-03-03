    import React, { useEffect, useState } from 'react'
    import Card from "react-bootstrap/Card";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./Webinar.css";
    // import axios from "axios";

     const data=[
      {
          "_id": "67bc6c6994844147afc4fd72",
          "title": "Mastering React: Live Q&A Session",
          "body": "Join us for a live Q&A session with React experts.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5001",
          "publish_date": "2025-02-25T14:00:00.000Z",
          "tags": [
              "React",
              "Webinar",
              "Live",
              "Frontend"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "image_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd5e9f3ae2663031d135e7",
          "title": "Building Scalable Web Apps with Node.js",
          "body": "Learn how to build high-performance and scalable web applications using Node.js.",
          "type": "video",
          "publish_date": "2025-03-05T16:30:00.000Z",
          "tags": [
              "Node.js",
              "Webinar",
              "Backend"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=Oe421EPjeBE",
          "image_url": "https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd5ec63ae2663031d135e9",
          "title": "State Management in React: Redux vs Context API",
          "body": "A deep dive into managing state in React applications with Redux and Context API.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5003",
          "publish_date": "2025-03-12T18:00:00.000Z",
          "tags": [
              "React",
              "Redux",
              "Context API",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=9KJxaFHotqI",
          "image_url": "https://img.youtube.com/vi/9KJxaFHotqI/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd661a3803fbd2bdbbd9ea",
          "title": "Advanced JavaScript Concepts Explained",
          "body": "An in-depth session covering closures, prototypes, and async programming in JavaScript.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5004",
          "publish_date": "2025-03-20T15:00:00.000Z",
          "tags": [
              "JavaScript",
              "Advanced",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=B7wHpNUUT4Y",
          "image_url": "https://img.youtube.com/vi/B7wHpNUUT4Y/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd663c3803fbd2bdbbd9ec",
          "title": "Web Security Best Practices",
          "body": "Learn essential security practices to protect your web applications from threats.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5005",
          "publish_date": "2025-04-02T17:00:00.000Z",
          "tags": [
              "Security",
              "Web",
              "Best Practices"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=6x5zWfkhL7U",
          "image_url": "https://img.youtube.com/vi/6x5zWfkhL7U/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd66573803fbd2bdbbd9ee",
          "title": "Introduction to Machine Learning",
          "body": "A beginner-friendly introduction to Machine Learning concepts and algorithms.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5006",
          "publish_date": "2025-04-10T14:00:00.000Z",
          "tags": [
              "Machine Learning",
              "AI",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=aircAruvnKk",
          "image_url": "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd666a3803fbd2bdbbd9f0",
          "title": "Python for Data Science",
          "body": "Learn how to use Python for data analysis, visualization, and machine learning.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5007",
          "publish_date": "2025-04-18T19:00:00.000Z",
          "tags": [
              "Python",
              "Data Science",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=RBSGKlAvoiM",
          "image_url": "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd667e3803fbd2bdbbd9f2",
          "title": "The Future of Web Development: Trends in 2025",
          "body": "Stay ahead with the latest web development trends and technologies.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5008",
          "publish_date": "2025-04-25T20:30:00.000Z",
          "tags": [
              "Web Development",
              "Trends",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=R4nhTRwxD8c",
          "image_url": "https://img.youtube.com/vi/R4nhTRwxD8c/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd66943803fbd2bdbbd9f4",
          "title": "Building RESTful APIs with Express.js",
          "body": "A hands-on session on creating RESTful APIs using Express.js and MongoDB.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5009",
          "publish_date": "2025-05-02T15:45:00.000Z",
          "tags": [
              "API",
              "Express.js",
              "MongoDB",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=pKd0Rpw7O48",
          "image_url": "https://img.youtube.com/vi/pKd0Rpw7O48/maxresdefault.jpg",
          "__v": 0
      },
      {
          "_id": "67bd66a23803fbd2bdbbd9f6",
          "title": "DevOps Essentials: CI/CD Pipelines",
          "body": "Learn the fundamentals of DevOps, including CI/CD pipeline setup and automation.",
          "type": "video",
          "author_id": "65d47b2c9c1e4f001a2b5010",
          "publish_date": "2025-05-10T12:00:00.000Z",
          "tags": [
              "DevOps",
              "CI/CD",
              "Webinar"
          ],
          "status": "published",
          "video_url": "https://www.youtube.com/watch?v=8fi7uSYlOdc",
          "image_url": "https://img.youtube.com/vi/8fi7uSYlOdc/maxresdefault.jpg",
          "__v": 0
      }
  ]
    
    export const Webinars = () => {

      const [input,setInput]=useState('')
      // const [data,setData]=useState([])
      const inputHandler=(e)=>{
        setInput(e.target.value)
      }

      // useEffect(()=>{
      //   fetchData()
      // },[])
      // const fetchData=async ()=>{
      //   const response=await axios.get("http://localhost:5000/api/v1/posts")
      //   console.log(response.data.posts)
      // }

      const filterData=data.filter((item)=>{
        return item.title.toLowerCase().includes(input.toLowerCase())
      })
      
    return (
        <div>
          <input type='text' onChange={inputHandler} placeholder='input' style={{border:"2px solid red"}}/>
               <div className="main-div">
      <div className="card-container">
        {data.length > 0 ? (
          filterData.map((k, index) => (
            <Card key={index} className="video-card">
              <Card.Img
                variant="top"
                src={k.image_url}
                alt="Thumbnail"
                className="card-img"
              />
              <Card.Body>
                <Card.Title className="card-title">{k.title}</Card.Title>
                <Card.Text className="card-body">{k.body}</Card.Text>
                <Card.Text className="card-date">
                  {new Date(k.publish_date).toDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
        </div>
    )
    }
