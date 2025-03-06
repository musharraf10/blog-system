import React, { useEffect, useState } from "react";
import { FileText, Video, BookOpen, Plus, Calendar, Eye } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Previewdata from "./Previewdata";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";

const ManageData = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
  });

  console.log("userdata", data);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <AuthCheckingComponent />;

  if (!data) {
    return <Navigate to="/login" />;
  } else {
    var userId = data?._id;
    console.log("userId",userId);
  }

  const navigate = useNavigate();
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;
  const [selectedeyebutton, setselectedeyebutton] = useState(null);
  const [selectedcontent, setselectedcontent] = useState(null);
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const fetchContentItems = async () => {
      try {
        const response = await axios.get(
          `${BackendServername}/posts/managecontent/getpost`,
          { params: { userId } }
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
      color: "#A855F7 ",
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

  const handleOpenModalofposts = (post) => {
    setselectedcontent(post);
    setselectedeyebutton(true);
  };

  const handleCloseModalofposts = () => {
    setselectedcontent(null);
    setselectedeyebutton(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Content Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryDetails.map((contentType) => (
                <div
                  key={contentType.type}
                  className="bg-white border border-gray-200 rounded-xl p-6 group transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                  onClick={() => navigate(`/admin/create-post/${contentType.type}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1565C0] to-[#42A5F5] opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4 transition-colors duration-300 group-hover:bg-blue-100">
                      <contentType.icon className="h-7 w-7 text-[#1565C0] transition-colors duration-300 group-hover:text-[#0D47A1]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-[#1565C0]">
                      {contentType.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{contentType.description}</p>
                  <button
                    className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/admin/create-post/${contentType.type}`)
                    }}
                  >
                    <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Create New
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

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

          {/* Content Type Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categoryDetails.map((type) => {
              const count = contentItems.filter(
                (item) => item.contentData === type.type
              ).length;
              return (
                <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div
                    style={{ backgroundColor: `${type.color}` }}
                    className=" p-4 text-white flex items-center justify-between"
                  >
                    <h3 className="font-semibold">{type.label}</h3>
                    <span className="text-2xl font-bold">
                      {type.type === "Article" ? `  ${articleCount}` : null}
                    </span>
                    <span className="text-2xl font-bold">
                      {type.type === "VideoTutorial" ? `  ${videoCount}` : null}
                    </span>
                    <span className="text-2xl font-bold">
                      {type.type === "StepbyStepGuide"
                        ? `  ${guideCount}`
                        : null}
                    </span>
                    <span className="text-2xl font-bold">
                      {type.type === "Webinar" ? `  ${webinarCount}` : null}
                    </span>{" "}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Content Table Section */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-4 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap">
              <button
                onClick={() => setActiveFilter("all")}
                className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${
                  activeFilter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
                    className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${
                      activeFilter === type.type
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
                      <tr
                        key={item.id}
                        className="text-center hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-start">
                          <div className="text-sm text-capitalize font-medium text-gray-900">
                            {item.refId?.title}
                          </div>
                          {/*                         
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          
                          {item.refId?.description}
                        </div> */}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            style={{
                              backgroundColor: category
                                ? category.color
                                : "#ccc", // Use category color or default gray
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
                          <Eye onClick={() => handleOpenModalofposts(item)} />
                          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No content found for the selected filter.
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedeyebutton && (
        <Previewdata
          post={selectedcontent}
          onHide={handleCloseModalofposts}
          show={true}
        />
      )}
    </>
  );
};

export default ManageData;