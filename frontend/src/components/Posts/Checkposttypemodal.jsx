import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkposttypemodal.css";
import { Link } from "react-router-dom";

export default function Checkposttypemodal({
  show,
  onHide,
  contentType,

  handleContentTypeChange,
}) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      className="checkposttypemodal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Content Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="content-type-label">Select Your Content</InputLabel>
            <Select
              labelId="content-type-label"
              id="content-type-select"
              value={contentType} // Bind to contentType state
              onChange={handleContentTypeChange}
              label="Select Your Content"
              style={{
                width: "250px",
                backgroundColor: "#f7f7f7",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px 12px",
              }}
            >
              <MenuItem value="selectyourcontent">Select Your Content</MenuItem>
              <MenuItem value="article">Articles</MenuItem>
              <MenuItem value="webinar">Webinar</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" className="close-button" onClick={onHide}>
          Close
        </Button>
        <Link to={`/admin/create-post/${contentType}`}>
          <Button variant="primary" className="open-button" onClick={onHide}>
            Open
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
