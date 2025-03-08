import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';

export default function Home() {
  const [guides, setGuides] = useState([]); // State to store the list of guides
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  // Fetch guides from the API
  const getdata = async () => {
    try {
      const response = await axios.get(`${BackendServername}/stepbystepguide`, {
        withCredentials: true,
      });

      console.log('API Response:', response.data); // Log the response for debugging

      if (response.status === 200) {
        // Ensure the response is an array
        if (Array.isArray(response.data.response)) {
          setGuides(response.data.response); // Set the array of guides
        } else {
          throw new Error('API response is not an array');
        }
      } else {
        throw new Error('Failed to fetch guides');
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const { isLoading, data } = useQuery({
      queryKey: ["user-auth"],
      queryFn: checkAuthStatusAPI,
    });

  let userRole = data?.role;

  useEffect(() => {
    getdata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(guides) || guides.length === 0) {
    return <div>No guides found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Guides</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail Image */}
              {guide.refId.thumbnail && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={guide.refId.thumbnail}
                    alt={guide.refId.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Guide Title and Description */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {guide.refId.title}
                </h2>
                <p className="text-gray-600 mb-4">{guide.refId.description}</p>

                {/* View Details Button */}
                <Link
                  to={`/${userRole}/guide/${guide._id}`} // Navigate to the details page
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}