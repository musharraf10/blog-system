import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";

const UpdateWebinar = () => {
  const { id } = useParams();
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    date: "",
    time: "",
    description: "",
  });

  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch the initial data
useEffect(() => {
  const fetchWebinar = async () => {
    try {
      const response = await axios.get(
        `${BackendServername}/posts/managecontent/getpost/${id}`
      );

      console.log("Fetched Webinar Data:", response.data);

      // Extract webinar details from refId
      if (response.data && response.data.refId) {
        const webinar = response.data.refId;
        setFormData({
          title: webinar.title || "",
          link: webinar.link || "",
          date: webinar.date ? webinar.date.split("T")[0] : "", // Extract only YYYY-MM-DD
          time: webinar.time || "", // Ensure there's a time field
          description: webinar.description || "",
        });
      } else {
        console.error("No webinar data found");
        alert("Webinar details not found.");
      }
    } catch (error) {
      console.error("Error fetching webinar:", error);
      alert("Failed to fetch webinar details.");
    } finally {
      setLoading(false);
    }
  };

  fetchWebinar();
}, [id, BackendServername]);


  const { isLoading, data } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  let userRole = data?.role;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "", // Ensure an empty string if no value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending update request with data:", formData);

    const response = await axios.put(
      `${BackendServername}/webinar/updatewebinar/${id}`,
      formData,
      { headers: { "Content-Type": "application/json" } } // Ensure correct format
    );

    console.log("Webinar updated successfully:", response.data);
    alert("Webinar updated successfully!");
    navigate(`/${userRole}/manage-content`);
  } catch (error) {
    console.error("Error updating webinar:", error);
    alert(error.response?.data?.message || "There was an error updating the webinar.");
  }
};


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm font-semibold mb-1 text-blue-600">
          Update Webinar
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Modify Webinar Details
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading webinar details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Webinar Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Webinar Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                placeholder="https://"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-6 h-6 mr-3" />
                <span>Update Webinar</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateWebinar;
