import React, { useEffect, useState } from "react";
import { FileText, Video, BookOpen, Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const ManageData = () => {
  const navigate = useNavigate();
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;
  const [contentItems, setContentItems] = useState([]);
  useEffect(() => {
    const fetchContentItems = async () => {
      try {
        const response = await axios.get(
          `${BackendServername}/posts/managecontent/getpost`
        );
        const data = response.data;
        console.log(data.data);
        setContentItems(data.data);
      } catch (error) {
        alert(error);
        console.error("Error fetching content items:", error);
      }
    };

    fetchContentItems();
  }, []);
  
  const [activeFilter, setActiveFilter] = useState("all");

  const categoryDetails = [
    {
      type: "Article",
      label: "Articles",
      icon: FileText,
      description: "Rich text, images, embedded media",
      color: "#3b82f6",
    },
    {
      type: "VideoTutorial",
      label: "Videos",
      icon: Video,
      description: "Host content with adaptive streaming",
      color: "#ef4444",
    },
    {
      type: "StepbyStepGuide",
      label: "Interactive Guides",
      icon: BookOpen,
      description: "Step-by-step tutorials with interactive elements",
      color: "#22C55E",
    },
    {
      type: "Webinar",
      label: "Webinars",
      icon: Calendar,
      description: "Scheduled live video sessions with chat/Q&A",
      color: "#A855F7",
    },
  ];

  const articleCount = contentItems.filter(
    (item) => item.contentData === "Article"
  ).length;
  const videoCount = contentItems.filter(
    (item) => item.contentData === "video-tutorial"
  ).length;
  const guideCount = contentItems.filter(
    (item) => item.contentData === "StepbyStepGuide"
  ).length;
  const webinarCount = contentItems.filter(
    (item) => item.contentData === "Webinar"
  ).length;

  // Filter content items
  const filteredItems =
    activeFilter === "all"
      ? contentItems
      : contentItems.filter((item) => item.contentData === activeFilter);

  const handleEdit = (item) => {
    // setEditingItem(item);
    // setShowModal(true);
    navigate(`/admin/update-post/${item.contentData.toLowerCase()}/${item._id}`)
  };

  

 

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`${BackendServername}/posts/managecontent/deletepost/${id}`);
      
      setContentItems((prevItems) => prevItems.filter((item) => item._id !== id));
  
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Post:", error);
      alert(`Error Deleting Post: ${error.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            Content Management Dashboard
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto opacity-90">
            Manage, update, and organize your content efficiently
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Content Types Section */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Content Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryDetails.map((contentType) => (
                <div
                  key={contentType.type}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/create-post/${contentType.type}`)
                  }
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                      <contentType.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {contentType.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    {contentType.description}
                  </p>
                  <button
                    className="mt-3 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/create-post/${contentType.type}`);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create New
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Type Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categoryDetails.map((type) => (
            <div key={type.type} className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div
                style={{ backgroundColor: `${type.color}` }}
                className="p-4 text-white flex items-center justify-between"
              >
                <h3 className="font-semibold">{type.label}</h3>
                <span className="text-2xl font-bold">
                  {type.type === "Article" && articleCount}
                  {type.type === "VideoTutorial" && videoCount}
                  {type.type === "StepbyStepGuide" && guideCount}
                  {type.type === "Webinar" && webinarCount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Table Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-4 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`mr-3 mb-2 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              All Content ({contentItems.length})
            </button>
            {categoryDetails.map((type) => {
              const count = contentItems.filter(
                (item) => item.contentData === type.type
              ).length;
              return (
                <button
                  key={type.type}
                  onClick={() => setActiveFilter(type.type)}
                  className={`mr-3 mb-2 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                    activeFilter === type.type
                      ? "bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {type.type} ({count})
                </button>
              );
            })}
          </div>

          {/* Content table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-center">
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  // Find matching category based on contentData
                  const category = categoryDetails.find(
                    (cat) => cat.type === item.contentData
                  );

                  return (
                    <tr key={item._id} className="text-center hover:bg-gray-50">
                      <td className="px-6 py-4 text-start">
                        <div className="text-sm font-medium text-gray-900">
                          {item.refId?.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {item.refId?.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          style={{
                            backgroundColor: category ? category.color : "#ccc",
                          }}
                          className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                        >
                          {category ? category.label : item.contentData}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.author.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No content found for the selected filter.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {/* <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header>
    <Modal.Title>Edit Content</Modal.Title>

  </Modal.Header>

  <Modal.Body>
    <Form>
    <Form.Group className="mb-3">
  <Form.Label>Title</Form.Label>
  <Form.Control
    type="text"
    value={editingItem?.refId?.title || ''}
    onChange={(e) =>
      setEditingItem((prevState) => ({
        ...prevState,
        refId: prevState.refId
          ? { ...prevState.refId, title: e.target.value }
          : { title: e.target.value },
      }))
    }
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Description</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    value={editingItem?.refId?.description || ''}
    onChange={(e) =>
      setEditingItem((prevState) => ({
        ...prevState,
        refId: prevState.refId
          ? { ...prevState.refId, description: e.target.value }
          : { description: e.target.value },
      }))
    }
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Price</Form.Label>
  <Form.Control
    type="number"
    value={editingItem?.price || 0} 
    onChange={(e) =>
      setEditingItem((prevState) => ({
        ...prevState,
        price: parseFloat(e.target.value) || 0, 
      }))
    }
  />
</Form.Group>

    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={handleCloseModal}
      className="text-gray-700 bg-gray-200 hover:bg-gray-300"
    >
      Close
    </Button>
    <Button
      variant="primary"
      onClick={handleSaveEdit}
      className="text-white bg-blue-600 hover:bg-blue-700"
    >
      Save Changes
    </Button>
  </Modal.Footer>
</Modal> */}

    </div>
  );
};

export default ManageData;