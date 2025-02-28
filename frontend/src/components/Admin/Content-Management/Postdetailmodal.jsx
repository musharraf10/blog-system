import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./postdetailmodal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
export default function PostDetailsModal({ post, show, onHide }) {
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(days / 365);
    return `${years} years ago`;
  };
  return (
    <Modal
      className="postdetailsmodal"
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "2rem" }}>Post Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="postdetailsmodal-body">
        <p>
          <span className="postdetailsmodal-titletag">Author:</span>{" "}
          <span className="postdetailsmodal-titletagdata">
            {post.author?.username || "Unknown"}
          </span>
        </p>

        <p>
          <span className="postdetailsmodal-titletag">Description:</span>
          <span className="postdetailsmodal-titletagdata">
            {post.description || "Unknown"}
          </span>
        </p>

        {post.image && (
          <div className="postdetailsmodal-image">
            <label
              style={{ marginBottom: "20px" }}
              className="postdetailsmodal-titletag"
            >
              Image:
            </label>
            <img
              className="postdetailsmodal-custom-image"
              src={post.image}
              alt="Post"
              style={{ height: "180px", borderRadius: "10px" }}
            />
          </div>
        )}

        {post.video && (
          <div className="postdetailsmodal-video">
            <label
              style={{ marginBottom: "20px" }}
              className="postdetailsmodal-titletag"
            >
              Video:
            </label>
            <iframe
              className="postdetailsmodal-custom-video"
              src={post.video.replace("youtu.be/", "www.youtube.com/embed/")}
              title="Post Video"
            ></iframe>
          </div>
        )}

        <p>
          <span className="postdetailsmodal-titletag">Created:</span>{" "}
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
        <p>
          <span className="postdetailsmodal-titletag">Updated:</span>{" "}
          {post.updatedAt
            ? new Date(post.updatedAt).toLocaleDateString()
            : "Unknown"}
        </p>
        <p>
          <span className="postdetailsmodal-titletag">Status:</span>{" "}
          {post.status || "N/A"}
        </p>
        <p>
          <span className="postdetailsmodal-titletag">Content:</span>{" "}
          {post.description || "No content available"}
        </p>

        <span className="postdetailsmodal-likes postdetailsmodal-titletag">
          Likes:
        </span>
        {post.likes?.length || 0}

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="postdetailsmodal-titletag">Comments</span>
            </Accordion.Header>
            <Accordion.Body>
              {post.comments?.length > 0 ? (
                <ul className="postdetailsmodal-comments-list">
                  {post.comments.map((comment) => (
                    <li
                      key={comment.$oid || comment.id}
                      className="postdetailsmodal-comment-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {/* Profile Picture or Default SVG Icon */}
                      {comment.author?.profilePic ? (
                        <img
                          src={comment.author.profilePic}
                          alt="Profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="gray"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                      )}

                      {/* Comment Content */}
                      <div>
                        <span className="postdetailsmodal-comment-author">
                          <strong>
                            {comment.author?.username || "Anonymous"}:
                          </strong>
                        </span>

                        <p style={{ margin: "5px 0" }}>
                          {comment.content || "No content"}
                        </p>

                        {/* Time Ago */}
                        {/* <small
                          className="postdetailsmodal-comment-date"
                          style={{ color: "#888" }}
                        >
                          {comment.updatedAt
                            ? timeAgo(comment.updatedAt)
                            : "Unknown"}
                        </small> */}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="postdetailsmodal-no-comments">No comments yet.</p>
              )}
            </Accordion.Body>
            ;
          </Accordion.Item>
        </Accordion>
      </Modal.Body>

      <Modal.Footer className="postdetailsmodal-modal-footer">
        <Button className="postdetailsmodal-close-btn" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// import React from "react";
// import {
//   X,
//   ThumbsUp,
//   MessageCircle,
//   Calendar,
//   Clock,
//   Tag,
//   User,
//   FileText,
// } from "lucide-react";

// const PostDetailsModal = ({ post, onHide }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-500";
//       case "pending":
//         return "bg-yellow-500";
//       case "rejected":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800">Post Details</h2>
//           <button
//             onClick={onHide}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PostDetailsModal;
