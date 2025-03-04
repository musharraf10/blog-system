"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileText, Video, BookOpen, Plus, Search, Edit, Trash2, Calendar } from "lucide-react"

const ManageData = () => {
  const navigate = useNavigate()

  // Sample data with more detailed fields
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      type: "articles",
      description: "Learn the fundamentals of React and build your first component",
      author: "Jane Smith",
      date: "2025-02-15",

    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      type: "articles",
      description: "Master CSS Grid, Flexbox, and modern styling approaches",
      author: "Mike Johnson",
      date: "2025-02-20",

    },
    {
      id: 3,
      title: "Full React Tutorial",
      type: "videos",
      description: "Complete guide to building professional React applications",
      author: "Sarah Davis",
      date: "2025-02-10",

    },
    {
      id: 4,
      title: "JavaScript ES6+ Features",
      type: "videos",
      description: "What's new in modern JavaScript and how to use it",
      author: "Alex Lee",
      date: "2025-02-05",

    },
    {
      id: 5,
      title: "Build a REST API with Node.js",
      type: "guides",
      description: "Step-by-step tutorial to create your own RESTful API",
      author: "Chris Wilson",
      date: "2025-01-28",

    },
    {
      id: 6,
      title: "Introduction to TypeScript",
      type: "guides",
      description: "Interactive guide to TypeScript fundamentals",
      author: "Emma Brown",
      date: "2025-02-18",

    },
    {
      id: 7,
      title: "State Management in React",
      type: "webinars",
      description: "Live session comparing Redux, Context API, and more",
      author: "David Martin",
      date: "2025-03-05",

    },
    {
      id: 8,
      title: "Accessibility Best Practices",
      type: "webinars",
      description: "Live workshop on building inclusive web applications",
      author: "Lisa Chen",
      date: "2025-03-10",

    },
  ])

  const [activeFilter, setActiveFilter] = useState("all")

  // Content type metadata
  const contentTypes = [
    {
      type: "articles",
      title: "Articles",
      icon: "document-text",
      color: "bg-blue-600",
      badge: "bg-blue-100 text-blue-800",
      hoverColor: "group-hover:bg-blue-700",
    },
    {
      type: "videos",
      title: "Videos",
      icon: "video-camera",
      color: "bg-indigo-600",
      badge: "bg-indigo-100 text-indigo-800",
      hoverColor: "group-hover:bg-indigo-700",
    },
    {
      type: "guides",
      title: "Interactive Guides",
      icon: "academic-cap",
      color: "bg-cyan-600",
      badge: "bg-cyan-100 text-cyan-800",
      hoverColor: "group-hover:bg-cyan-700",
    },
    {
      type: "webinars",
      title: "Webinars",
      icon: "presentation-chart-line",
      color: "bg-sky-600",
      badge: "bg-sky-100 text-sky-800",
      hoverColor: "group-hover:bg-sky-700",
    },
  ]

  const categorydetails = [
    {
      type: "articles",
      label: "Articles",
      icon: FileText,
      description: "Rich text, images, embedded media",
    },
    {
      type: "video",
      label: "Videos",
      icon: Video,
      description: "Hosted content with adaptive streaming",
    },
    {
      type: "guide",
      label: "Interactive Guides",
      icon: BookOpen,
      description: "Step-by-step tutorials with interactive elements",
    },
    {
      type: "webinar",
      label: "Webinars & Live Sessions",
      icon: Calendar,
      description: "Scheduled live video sessions with chat/Q&A",
    },
  ]

  // Filter content items
  const filteredItems =
    activeFilter === "all" ? contentItems : contentItems.filter((item) => item.type === activeFilter)

  // Get type object by type name
  const getTypeInfo = (typeName) => {
    return contentTypes.find((type) => type.type === typeName) || contentTypes[0]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Content Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categorydetails.map((contentType) => (
              <div
                key={contentType.type}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/admin/create-post/${contentType.type}`)}
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
                    navigate(`/admin/create-post/${contentType.type}`)
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

      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white py-16 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMCAwaDEyMHYyMEgweiIvPjxwYXRoIGQ9Ik0wIDBoMTIwdjIwSDB6IiBmaWxsPSIjRkZGIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-center tracking-tight">Content Management Dashboard</h1>
          <p className="text-xl text-center max-w-2xl mx-auto opacity-90 font-light">
            Manage, update, and organize your content efficiently
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Content Types */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-12 border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] w-1.5 h-6 rounded mr-3 inline-block"></span>
              Content Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categorydetails.map((contentType) => (
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

        {/* Type Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contentTypes.map((type) => {
            const count = contentItems.filter((item) => item.type === type.type).length
            return (
              <div
                key={type.type}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 transform hover:-translate-y-1 group"
              >
                <div
                  className={`bg-gradient-to-r from-[#1565C0] to-[#42A5F5] p-6 text-white flex items-center justify-between transition-all duration-300`}
                >
                  <h3 className="font-semibold text-lg">{type.title}</h3>
                  <span className="text-3xl font-bold">{count}</span>
                </div>
                <div className="p-5 bg-white">
                  <div className="text-sm text-gray-600 flex items-center justify-between">
                    <span>{count === 1 ? "item" : "items"} published</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full transition-colors duration-300 group-hover:bg-gray-200">
                      {Math.round((count / contentItems.length) * 100)}% of total
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                    <div
                      className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] h-1.5 rounded-full transition-all duration-500 ease-out group-hover:from-[#0D47A1] group-hover:to-[#1976D2]"
                      style={{ width: `${Math.round((count / contentItems.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-xl shadow-lg mb-12 border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center">
            <button
              onClick={() => setActiveFilter("all")}
              className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${activeFilter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              All Content ({contentItems.length})
            </button>

            {contentTypes.map((type) => {
              const count = contentItems.filter((item) => item.type === type.type).length
              return (
                <button
                  key={type.type}
                  onClick={() => setActiveFilter(type.type)}
                  className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${activeFilter === type.type
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {type.title} ({count})
                </button>
              )
            })}
          </div>

          {/* Content table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium text-gray-800 hover:text-[#1565C0] transition-colors duration-300">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs mt-1">{item.description}</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeInfo(item.type).badge
                          }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-600 text-center">{item.author}</td>
                    <td className="px-6 py-6 text-sm text-gray-600 text-center">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-medium space-x-3 text-center">
                      <button className="px-4 py-2 bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white rounded-md transition-all duration-300 hover:shadow-md hover:from-[#0D47A1] hover:to-[#1565C0] text-xs font-medium transform hover:-translate-y-0.5 relative overflow-hidden group">
                        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                        <Edit className="h-3.5 w-3.5 inline mr-1.5" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white rounded-md transition-all duration-300 hover:shadow-md hover:from-[#B71C1C] hover:to-[#D32F2F] text-xs font-medium transform hover:-translate-y-0.5 relative overflow-hidden group">
                        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                        <Trash2 className="h-3.5 w-3.5 inline mr-1.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Search className="h-10 w-10 text-[#1565C0]" />
              </div>
              <p className="text-lg font-medium text-gray-700">No content found for the selected filter.</p>
              <p className="text-sm mt-2 text-gray-500 max-w-md mx-auto">
                Try selecting a different category or create new content to get started.
              </p>
              <button
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 font-medium relative overflow-hidden group"
                onClick={() => setActiveFilter("all")}
              >
                <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                View All Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageData

