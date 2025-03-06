import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

const WebinarForm = () => {
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    date: "",
    time: "",
    price: "",
    description: "",
    thumbnail: null, 
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        thumbnail: file,
      }));
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      alert("Please upload a thumbnail image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("thumbnail", formData.thumbnail); 

    try {
      const response = await axios.post(
        `${BackendServername}/webinar/addwebinar`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Webinar added successfully:", response.data);
      alert("Webinar registration submitted successfully!");

      setFormData({
        title: "",
        link: "",
        date: "",
        time: "",
        price: "",
        description: "",
        thumbnail: null,
      });

      setPreviewImage(null);
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
            <label className="block text-sm font-medium text-gray-700">
              Webinar Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webinar Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              placeholder="https://"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Add Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            ></textarea>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Thumbnail Preview"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <Plus className="w-6 h-6 mr-3" />
              <span>Add Webinar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebinarForm;
