import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg transform -translate-y-10">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Update Profile
        </h2>
        
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-blue-500 text-6xl mb-2" />
          <Link to="#" className="text-blue-500 hover:underline text-sm">
            Change Profile Photo
          </Link>
        </div>
        
        {/* Profile Form */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="John" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="johndoe@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-200">
            <FaTimes className="mr-2" /> Cancel
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <FaSave className="mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
