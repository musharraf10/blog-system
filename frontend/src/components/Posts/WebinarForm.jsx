import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests

const WebinarForm = () => {

  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    date: "",
    time: "",
    price:"",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Sending form data to the backend API without token or headers
      const response = await axios.post(`${BackendServername}/webinar/addwebinar`, formData,
        {withCredentials:true}


      );


      console.log("Webinar added successfully:", response.data);
      alert("Webinar registration submitted successfully!");

      setFormData({  title: "",
        link: "",
        date: "",
        time: "",
        price:"",
        description: "",})
    } catch (error) {
      console.error("Error submitting webinar:", error);
      alert("There was an error submitting the webinar.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div
          style={{ color: "#007bff" }}
          className="uppercase tracking-wide text-sm font-semibold mb-1"
        >
          Webinar Registration
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Enter Webinar Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Webinar Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Webinar Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              placeholder="https://"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>





          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Add Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
          </div>










          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
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
              className="inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus
                sx={{
                  "&:hover": {
                    color: "black", // Change icon color to black on hover
                  },
                }}
                className="w-6 h-6 mr-3 "
              />
              <span>Add Webinar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebinarForm;
