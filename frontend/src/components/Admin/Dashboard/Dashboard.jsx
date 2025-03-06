"use client"

import { useEffect, useState } from "react"
import { Card, Button, Container, Row, Col } from "react-bootstrap"
import {
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import MyChart from "./CanvasHandiler"
import SubscriptionStats from "./SubscriptionStats"

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

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
    ]
    setStats(generateStats)

    // Adjust visible cards based on screen width
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setVisibleCards(1)
      } else if (width < 992) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    // Call once on mount and add event listener
    handleResize()
    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + visibleCards >= stats.length ? 0 : prevIndex + 1))
    }, 3000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [stats.length, visibleCards])

  const handleNext = () => {
    if (startIndex + visibleCards < stats.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "User Growth",
        data: [1000, 2000, 1500, 3000, 3500, 4000],
        backgroundColor: "rgba(66, 165, 245, 0.4)",
        borderColor: "#1565C0",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // Chart options with responsive: true
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "2rem 1rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          * {
            transition: all 0.3s ease;
          }
          
          .stat-card {
            animation: fadeIn 0.5s ease-in-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
          
          .carousel-btn:not(:disabled):active {
            animation: pulse 0.3s ease-in-out;
          }
          
          @media (max-width: 768px) {
            .carousel-btn {
              width: 36px !important;
              height: 36px !important;
            }
          }
          
          @media (max-width: 576px) {
            .carousel-btn {
              width: 32px !important;
              height: 32px !important;
            }
          }
        `}
      </style>

      <Container fluid className="px-3 px-md-4">
        <h2
          style={{
            background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "700",
            marginBottom: "2rem",
            fontSize: "2.2rem",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          Welcome To Admin Dashboard
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            variant="primary"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="carousel-btn"
            style={{
              backgroundColor: "#1565C0",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px rgba(21, 101, 192, 0.2)",
              transition: "all 0.3s ease",
              ...(startIndex === 0
                ? {
                    backgroundColor: "#90CAF9",
                    opacity: 0.7,
                    cursor: "not-allowed",
                  }
                : {}),
            }}
            onMouseEnter={(e) => {
              if (startIndex !== 0) {
                e.currentTarget.style.backgroundColor = "#42A5F5"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(21, 101, 192, 0.3)"
              }
            }}
            onMouseLeave={(e) => {
              if (startIndex !== 0) {
                e.currentTarget.style.backgroundColor = "#1565C0"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(21, 101, 192, 0.2)"
              }
            }}
          >
            <FaChevronLeft />
          </Button>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "nowrap",
              overflow: "hidden",
              width: "100%",
              transition: "all 0.5s ease",
            }}
          >
            {stats.slice(startIndex, startIndex + visibleCards).map((stat, index) => (
              <Card
                key={index}
                className="stat-card"
                style={{
                  flex: `0 0 calc(${100 / visibleCards}% - ${((visibleCards - 1) * 16) / visibleCards}px)`,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  background: "white",
                  border: "none",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(21, 101, 192, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)"
                }}
              >
                <Card.Body
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.5rem",
                  }}
                >
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#1565C0",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {stat.title}
                    </Card.Title>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "700",
                        background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      color: "#42A5F5",
                      padding: "0.8rem",
                      borderRadius: "50%",
                      backgroundColor: "rgba(66, 165, 245, 0.1)",
                    }}
                  >
                    {stat.icon}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={startIndex + visibleCards >= stats.length}
            className="carousel-btn"
            style={{
              backgroundColor: "#1565C0",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 6px rgba(21, 101, 192, 0.2)",
              transition: "all 0.3s ease",
              ...(startIndex + visibleCards >= stats.length
                ? {
                    backgroundColor: "#90CAF9",
                    opacity: 0.7,
                    cursor: "not-allowed",
                  }
                : {}),
            }}
            onMouseEnter={(e) => {
              if (startIndex + visibleCards < stats.length) {
                e.currentTarget.style.backgroundColor = "#42A5F5"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(21, 101, 192, 0.3)"
              }
            }}
            onMouseLeave={(e) => {
              if (startIndex + visibleCards < stats.length) {
                e.currentTarget.style.backgroundColor = "#1565C0"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(21, 101, 192, 0.2)"
              }
            }}
          >
            <FaChevronRight />
          </Button>
        </div>

        <Row className="mt-4">
          <Col>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "none",
                overflow: "hidden",
                transition: "all 0.3s ease",
                marginBottom: "2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(21, 101, 192, 0.15)"
                e.currentTarget.style.transform = "translateY(-5px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <Card.Body>
                <SubscriptionStats />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h5
          style={{
            background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "600",
            marginTop: "2rem",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          Traffic Overview
        </h5>

        <Row>
          <Col>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "none",
                overflow: "hidden",
                transition: "all 0.3s ease",
                marginBottom: "2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(21, 101, 192, 0.15)"
                e.currentTarget.style.transform = "translateY(-5px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <Card.Body>
                <div
                  style={{
                    height: "400px",
                    padding: "1rem",
                  }}
                >
                  <MyChart data={chartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard

