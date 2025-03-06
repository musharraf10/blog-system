import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function GuideDetails() {
  const { guideId } = useParams(); // Get the guide ID from the URL
  const [guide, setGuide] = useState(null); // State to store the guide details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  // Fetch guide details from the API
  const getGuideDetails = async () => {
    try {
      const response = await axios.get(`${BackendServername}/stepbystepguide/${guideId}`, {
        withCredentials: true,
      });

      console.log('API Response:', response.data.response); 

      if (response.status === 200) {
        setGuide(response.data.response); 
      } else {
        throw new Error('Failed to fetch guide details');
      }
    } catch (error) {
      console.error('Error fetching guide details:', error);
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getGuideDetails();
  }, [guideId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!guide) {
    return <div>No guide found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/subscriber/stepbystepguide"
          className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Guides
        </Link>

        {/* Guide Title and Description */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {guide.refId.title}
        </h1>
        <p className="text-gray-600 mb-8">{guide.refId.description}</p>

        {/* Steps */}
        <div className="space-y-8">
          {guide.refId.steps.map((step, index) => (
            <div key={step._id} className="border-t pt-8 first:border-t-0 first:pt-0">
              <div className="flex items-start">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Step Details */}
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.stepTitle}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.stepDescription}</p>

                  {/* Step Media */}
                  {step.stepMedia && (
                    <div className="mt-4">
                      {step.stepMedia.includes('video') ? (
                        <video
                          controls
                          className="w-full rounded-lg shadow-lg"
                          src={step.stepMedia}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={step.stepMedia}
                          alt={`Step ${index + 1}`}
                          className="w-full rounded-lg shadow-lg"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}