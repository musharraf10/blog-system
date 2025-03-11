import { useEffect, useState } from 'react';
import axios from 'axios';

const SubscribtionCards = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/v1/subscribe/getplans',
      );
      console.log('API Response:', data);

      // Fix: Extracting the correct array from `data.prices.data`
      setPrices(data.prices?.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setLoading(false);
    }
  };

  const createSession = async (priceId) => {
    try {
      const token = localStorage.getItem('token'); // Get token from storage

      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/v1/subscribe/stripepost',
        { priceId }, // Your request body (if needed)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Ensure cookies are sent
        },
      );

      const data = response.data; 
      
      if (data.sessionId && data.sessionId.url) {
        window.location.href = data.sessionId.url; // Redirect to Stripe Checkout
      } else {
        console.error("Failed to get session URL:", data);
      }

      console.log('Session Created:', response.data);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const backgroundColors = {
    Basic: 'bg-green-500',
    Standard: 'bg-red-500',
    Premium: 'bg-pink-400',
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 text-white bg-gray-900">
      {loading ? (
        <p className="text-2xl font-semibold">Loading...</p>
      ) : prices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {prices.map((price) => (
            <div
              key={price.id}
              className="overflow-hidden transition transform bg-gray-800 rounded-lg shadow-lg w-72 h-96 hover:scale-105"
            >
              <div
                className={`h-48 flex items-center justify-center ${
                  backgroundColors[price.nickname] || 'bg-blue-500'
                }`}
              >
                <div className="flex items-center justify-center w-32 h-32 border-4 border-white rounded-full shadow-md">
                  <p className="text-3xl font-bold">
                    ${price.unit_amount / 100}
                  </p>
                </div>
              </div>
              <div className="p-5 text-center">
                <h2 className="text-2xl font-bold">
                  {price.nickname || 'Plan'}
                </h2>
                <button
                  className="px-4 py-2 mt-4 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => createSession(price.id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-2xl font-semibold">No Plans Available</p>
      )}
    </div>
  );
};

export default SubscribtionCards;
