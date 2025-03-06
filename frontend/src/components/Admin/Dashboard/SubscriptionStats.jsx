import React, { useState } from "react";
import { Card, Dropdown, Form, Row, Col, Container } from "react-bootstrap";

const usersData = [
  { id: 1, name: "John Doe", status: "active", role: "Admin" },
  { id: 2, name: "Jane Smith", status: "expired", role: "Creator" },
  { id: 3, name: "Alice Brown", status: "active", role: "Subscriber" },
  { id: 4, name: "Bob Johnson", status: "upcoming", role: "Moderator" },
];

const transactionsData = [
  {
    id: 1,
    user: "John Doe",
    amount: "$50",
    status: "Completed",
    date: "2025-02-19",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: "$30",
    status: "Pending",
    date: "2025-02-19",
  },
  {
    id: 3,
    user: "Alice Brown",
    amount: "$40",
    status: "Completed",
    date: "2025-02-10",
  },
  {
    id: 4,
    user: "Bob Johnson",
    amount: "$25",
    status: "Pending",
    date: "2025-02-20",
  },
];

const SubscriptionStats = () => {
  const [filter, setFilter] = useState("totalUsers");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredUsers = () => {
    let filtered = usersData;
    if (filter === "newSubscriptions") {
      filtered = usersData.filter((user) => user.status === "active");
    } else if (filter === "expiredSubscriptions") {
      filtered = usersData.filter((user) => user.status === "expired");
    } else if (filter === "upcomingExpirations") {
      filtered = usersData.filter((user) => user.status === "upcoming");
    }
    return filtered.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTransactions = () => {
    return selectedDate
      ? transactionsData.filter((tx) => tx.date === selectedDate)
      : transactionsData;
  };

  const totalAmount = filteredTransactions().reduce((sum, tx) => {
    return sum + parseFloat(tx.amount.replace("$", ""));
  }, 0);

  const totalPendingWork = filteredTransactions().filter(
    (tx) => tx.status === "Pending"
  ).length;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <Card
        className="mt-4  p-4 rounded-1 w-100 mx-auto border-0"
        style={{ maxWidth: "100%" }}
      >
        <h5 className="fs-2 fw-bold text-start text-center mt-2 mb-5 text-[#1E3A8A]"  // or use text-[#3B82F6]
        >
          USERS DATA
        </h5>
        <Card.Header className="bg-white substatsbar border-0">
          <Row className="align-items-center text-end justify-content-between">
            <Col xs={12} md={4} className="text-start justify-content-start">
              <h5 className="ml-xt-center fw-bold ">Subscription Stats</h5>
            </Col>
            <Col xs={12} md={4} className="mt-2  mt-md-0 mr-12"
              style={{ marginLeft: "-185px" }}
            >
              <Form.Control
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={4} md={2} className="mt-2 mt-md-0 "
              style={{ marginLeft: "0" }}
            >
              <Dropdown onSelect={handleFilterChange}>
                <Dropdown.Toggle
                  className="w-100 w-md-auto"
                  style={{ minWidth: "210px", cursor: "pointer", color: "black", marginLeft: "-150px" }}
                >
                  {filter === "totalUsers"
                    ? "Total Users"
                    : filter === "newSubscriptions"
                      ? "New Subscriptions"
                      : filter === "expiredSubscriptions"
                        ? "Expired Subscriptions"
                        : "Upcoming Expirations"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="dropdownsubstat"
                    eventKey="totalUsers"
                  >
                    Total Users
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdownsubstat"
                    eventKey="newSubscriptions"
                  >
                    New Subscriptions
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdownsubstat"
                    eventKey="expiredSubscriptions"
                  >
                    Expired Subscriptions
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="dropdownsubstatlast"
                    eventKey="upcomingExpirations"
                  >
                    Upcoming Expirations
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <table
            className="text-capitalize table table-bordered table-hover mt-3 ml-12"
            style={{
              width: "85%",
              borderCollapse: "separate",
              borderSpacing: "0",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #ccc",
              marginLeft: "70px"
            }}
          >
            <thead className="table-light text-center">
              <tr>
                <th
                  style={{
                    borderTopLeftRadius: "12px",
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    borderTopRightRadius: "12px",
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers().map((user, index, array) => (
                <tr key={user.id}>
                  <td className="text-center">{user.name}</td>
                  <td
                    className="fs-6 fw-bold text-center"
                    style={{
                      color:
                        user.status === "active"
                          ? "green"
                          : user.status === "expired"
                            ? "darkred"
                            : "orange",
                    }}
                  >
                    {user.status}
                  </td>
                  <td className="fs-6 text-center" style={{ minWidth: "120px" }}>
                    {user.role}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    borderBottomLeftRadius: "12px",
                  }}
                />
                <td />
                <td
                  style={{
                    borderBottomRightRadius: "12px",
                  }}
                />
              </tr>
            </tbody>
          </table>

          <h5 className="fs-2 fw-bold text-start text-center mt-2 mb-5 text-[#1E3A8A]"
          >
            Transactions Data
          </h5>

          {/* Wrapped Total Amount, Pending Work, and Calendar in a single row */}
          <div className="text-center mt-5 mb-5 d-flex flex-row flex-wrap justify-content-evenly align-items-center">
            <h5 className="fw-bold m-0">
              Total Transaction Amount:{" "}
              <span className="text-primary">${totalAmount.toFixed(2)}</span>
            </h5>

            <h5 className="fw-bold m-0">
              Total Pending Work:{" "}
              <span className="text-warning">{totalPendingWork}</span>
            </h5>

            {/* Date Picker in the same row */}
            <Form.Control
              type="date"
              className="mx-2"
              style={{
                maxWidth: "150px",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Table remains unchanged */}
          <table
            className="table table-bordered table-hover mt-4"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
          >
            <thead className="table-light text-center">
              <tr>
                <th
                  style={{
                    borderTopLeftRadius: "12px",
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  User
                </th>
                <th
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    borderTopRightRadius: "12px",
                    backgroundImage: "linear-gradient(90deg, #1565C0, #42A5F5)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions().length > 0 ? (
                filteredTransactions().map((tx, index) => (
                  <tr
                    key={tx.id}
                    style={{
                      backgroundColor: index % 2 === 1 ? "#f2f2f2" : "transparent",
                    }}
                  >
                    <td className="text-center">{tx.user}</td>
                    <td className="text-center">{tx.amount}</td>
                    <td
                      className={`fw-bold text-center ${tx.status === "Completed" ? "text-success" : "text-warning"
                        }`}
                    >
                      {tx.status}
                    </td>
                    <td className="text-center">{tx.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted text-center">
                    No transactions found
                  </td>
                </tr>
              )}
              {/* Rounded Bottom Corners */}
              <tr>
                <td style={{ borderBottomLeftRadius: "12px" }} />
                <td />
                <td />
                <td style={{ borderBottomRightRadius: "12px" }} />
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubscriptionStats;