import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Webinar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const Webinars = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/webinar");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = data.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  // Fixed Images for Webinars
  const fixedImages = [
    "https://picsum.photos/id/1011/200/150",
    "https://picsum.photos/id/1025/200/150",
    "https://picsum.photos/id/1035/200/150",
    "https://picsum.photos/id/1043/200/150"
  ];

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          onChange={inputHandler}
          placeholder="Search Webinars..."
          className="search-input"
        />
      </div>

      <div className="card-container">
        {data.length > 0 ? (
          filterData.map((k, index) => (
            <Link to={`${k.link}`} key={index} className="card-link">
              <Card
                key={index}
                className={`video-card ${index < 3 ? "top-row" : "bottom-row"}`}
              >
                {/* Use Fixed Images */}
                <Card.Img
                  variant="top"
                  src={fixedImages[index % fixedImages.length]}
                  alt="Webinar Thumbnail"
                  className="card-img"
                />

                <Card.Body className="card-body-fixed">
                  <Card.Title className="card-title">{k.title}</Card.Title>
                  <Card.Text className="card-body-text">{k.body}</Card.Text>
                  <Card.Text className="card-date">
                    {new Date(k.date).toDateString()}
                  </Card.Text>
                  <button className="watch-button">Watch</button>
                </Card.Body>
              </Card>
            </Link>
          ))
        ) : (
          <p>No webinars found.</p>
        )}
      </div>
    </div>
  );
};
