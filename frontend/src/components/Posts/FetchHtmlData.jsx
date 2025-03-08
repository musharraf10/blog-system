import { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Card, Button, Badge } from "react-bootstrap";
import { SlDislike, SlLike } from "react-icons/sl";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const FetchHtmlData = () => {
    const postId = "67c6d3c35aa97e9c7350a33d"; 
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/article/getarticle/${postId}")
            .then(response => {
                const post = response.data.articles;
                setTitle(post.refId.title);
                setImage(post.refId.thumbnail);
                setDescription(post.refId.description);
                setTags(post.refId.tags || []);
                setLikes(post.likes.length);
                setDislikes(post.dislikes.length);
                setComments(post.comments || []);
            })
            .catch(error => console.error("Error fetching post data:", error));
    }, [postId]);

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <Card style={{ width: "90%", padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>{title}</h2>

                {/* Article Image */}
                {image && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                        <Card.Img variant="top" src={image} alt="Article" style={{ width: "70%", borderRadius: "8px" }} />
                    </div>
                )}

                {/* Description */}
                <Card.Text style={{ marginTop: "10px", textAlign: "justify" }}>
                    {showMore ? description : `${description.substring(0, 150)}... `}
                    <span style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Read Less" : "Read More"}
                    </span>
                </Card.Text>

                {/* Likes & Dislikes */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <Button variant="outline-success" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <SlLike /> <strong>{likes}</strong> Likes
                    </Button>
                    <Button variant="outline-danger" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <SlDislike /> <strong>{dislikes}</strong> Dislikes
                    </Button>
                </div>

                {/* Comments Section */}
                <Accordion style={{ marginBottom: "10px" }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => setIsOpen(!isOpen)}>
                            Comments {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                        </Accordion.Header>
                        <Accordion.Body>
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <div key={index} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                                        <img src="https://via.placeholder.com/40" alt="profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                        <div style={{ marginLeft: "10px" }}>
                                            <strong>Unknown User</strong>
                                            <p style={{ margin: "5px 0" }}>{comment.text || "Sample comment text"}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/* Tags */}
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <h5 style={{ fontWeight: "bold" }}>Tags:</h5>
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Badge key={index} bg="primary" style={{ padding: "8px 12px", fontSize: "14px", marginRight: "5px" }}>
                                {tag}
                            </Badge>
                        ))
                    ) : (
                        <span>No Tags</span>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default FetchHtmlData;









// <div style={{ width: "100%", maxWidth: "600px", padding: "20px", border: "2px solid #ddd", borderRadius: "10px", boxShadow: "5px 5px 15px rgba(0,0,0,0.2)", backgroundColor: "#fff", transition: "transform 0.3s ease-in-out", textAlign: "center", margin: "10px auto",marginLeft:0 }}>
// <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>{title}</h2>
// <div>
//     {descriptionContent.map((html, index) => (
//         <div key={index} style={{ marginBottom: "10px" }}>
//             {parse(html, {
//                 replace: (domNode) => {
//                     if (domNode.name === "p") {
//                         const text = domNode.children[0].data;
//                         const isExpanded = expandedIndexes[index];
//                         const isLong = text.length > 200;
//                         return (
//                             <p style={{ display: "inline" }}>
//                                 {isLong && !isExpanded ? `${text.substring(0, 200)}... ` : text}
//                                 {isLong && (
//                                     <button onClick={() => toggleReadMore(index)} style={{ border: "none", background: "none", color: "blue", cursor: "pointer" }}>
//                                         {isExpanded ? "Read Less" : "Read More"}
//                                     </button>
//                                 )}
//                             </p>
//                         );
//                     }
//                     if (domNode.name === "img") {
//                         return (
//                             <img src={domNode.attribs.src} alt={domNode.attribs.alt} style={{ width: "100%", maxWidth: "250px", height: "150px", objectFit: "cover", borderRadius: "8px", display: "block", margin: "10px auto" }} />
//                         );
//                     }
//                 },
//             })}
//         </div>
//     ))}
// </div>


// {Comments.map((k, index) => (
//     <div key={index} style={{ marginTop: "15px", padding: "10px", borderTop: "1px solid #ddd" }}>
//         <div style={{ display: "flex", gap: "20px" }}>
//             <p style={{ margin: "5px 0", fontWeight: "bold" }}><SlLike color="green" /> Likes {k.likes.length} </p>
//             <p style={{ margin: "5px 0", fontWeight: "bold" }}><SlDislike color="red" /> Dislikes {k.dislikes.length}</p>
//         </div>
//     </div>
// ))}


// <Accordion>
//     <Accordion.Item eventKey="0">
//         <Accordion.Header>Comments </Accordion.Header>
//         <Accordion.Body>
//             {Comments.length > 0 ? (
//                 <div>
//                     {Comments[0].comments.map((comment, index) => (
//                         <div key={index} style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "10px",
//                             padding: "10px 0",
//                             borderBottom: "1px solid #ddd"
//                         }}>
                        
//                             <img
//                                 src={comment.profile || "default-profile-url.jpg"}
//                                 alt="Profile"
//                                 style={{
//                                     width: "40px",
//                                     height: "40px",
//                                     borderRadius: "50%",
//                                 }}
//                             />

                          
//                             <div>
//                                 <strong style={{
//                                     fontSize: "14px",
//                                     color: "#333",
//                                 }}>{comment.name || "Unknown User"}</strong>
//                                 <p style={{
//                                     margin: "5px 0 0",
//                                     fontSize: "14px",
//                                     color: "#555",
//                                 }}>{comment.text}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No comments yet.</p>
//             )}
//         </Accordion.Body>
//     </Accordion.Item>
// </Accordion>


// <h3>Tags:</h3>
// <ul style={{
//     listStyleType: "none",
//     padding: "0",
//     display: "flex",
//     gap: "10px",
//     justifyContent: "center",
//     flexWrap: "wrap"
// }}>
//     {tags.map((tag, index) => (
//         <li key={index} style={{
//             backgroundColor: "#007bff",
//             color: "white",
//             padding: "5px 10px",
//             borderRadius: "5px"
//         }}>
//             {tag}
//         </li>
//     ))}
// </ul>
// </div>