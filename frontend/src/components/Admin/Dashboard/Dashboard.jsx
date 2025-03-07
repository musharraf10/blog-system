import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaVideo,
} from "react-icons/fa";
import MyChart from "./CanvasHandiler";
import SubscriptionStats from "./SubscriptionStats";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const generateStats = [
      { title: "Total Users", value: Math.floor(Math.random() * 5000) + 1000, icon: <FaUsers /> },
      { title: "Total Revenue", value: `$${(Math.random() * 50000 + 5000).toFixed(2)}`, icon: <FaMoneyBillWave /> },
      { title: "New Subscriptions", value: Math.floor(Math.random() * 500) + 50, icon: <FaClipboardList /> },
      { title: "Active Users", value: Math.floor(Math.random() * 3000) + 500, icon: <FaCheckCircle /> },
      { title: "Inactive Users", value: Math.floor(Math.random() * 1000) + 200, icon: <FaTimesCircle /> },
      { title: "Paid Subscribers", value: Math.floor(Math.random() * 4000) + 500, icon: <FaDollarSign /> },
      { title: "Unpaid Subscribers", value: Math.floor(Math.random() * 1000) + 100, icon: <FaClipboardList /> },
      { title: "Published Articles", value: Math.floor(Math.random() * 1000) + 100, icon: <FaFileAlt /> },
      { title: "Published Videos", value: Math.floor(Math.random() * 500) + 50, icon: <FaVideo /> },
    ];
    setStats(generateStats);

    // Adjust visible cards based on screen width
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 992) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    // Call once on mount and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) =>
        prevIndex + visibleCards >= stats.length ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [stats.length, visibleCards]);

  const handleNext = () => {
    if (startIndex + visibleCards < stats.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "User Growth",
        data: [1000, 2000, 1500, 3000, 3500, 4000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Chart options with responsive: true
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Container fluid className="px-3 px-md-4">
      <h2 className="fs-2 fw-bold text-start text-center mt-2 mb-5 text-[#1E3A8A]"  // or use text-[#3B82F6]
      >
        Welcome To Admin Dashboard
      </h2>

      <div className="stats-carousel-container">
        <Button
          variant="dark"
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="carousel-btn me-2"
        >
          ◀
        </Button>

        <div className="stats-carousel">
          {stats.slice(startIndex, startIndex + visibleCards).map((stat, index) => (
            <Card
              key={index}
              className="cardsdata p-3 border-0 text-capitalize"
            >
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <Card.Title>{stat.title}</Card.Title>
                  <Card.Text className="fs-3">{stat.value}</Card.Text>
                </div>
                <div className="fs-2">{stat.icon}</div>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Button
          variant="dark"
          onClick={handleNext}
          disabled={startIndex + visibleCards >= stats.length}
          className="carousel-btn ms-2"
        >
          ▶
        </Button>
      </div>

      <Row className="mt-4">
        <Col>
          <Card className="border-0">
            <Card.Body>
              <SubscriptionStats />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5 className="fs-2 fw-bold text-start text-center mt-2 mb-5 text-[#1E3A8A]"
      >Traffic Overview</h5>
      <Row>
        <Col>
          <Card className="mt-4 border-0">
            <Card.Body>
              <div className="chart-container">
                <MyChart data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;