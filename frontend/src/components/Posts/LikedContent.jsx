
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchMostLikedVideos, fetchMostLikedArticles } from "../../APIServices/posts/postsAPI";

const LikedContent = () => {
  const [mostLikedVideos, setMostLikedVideos] = useState([]);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ articles: null, videos: null });

  useEffect(() => {
    const fetchLikedContent = async () => {
      try {
        const videos = await fetchMostLikedVideos();
        const articles = await fetchMostLikedArticles();

        console.log("API Liked Videos Response:", videos);
        console.log("API Liked Articles Response:", articles);

        setMostLikedVideos(videos?.data || []);
        setMostLikedArticles(articles?.data || []);
      } catch (error) {
        console.error("Error fetching liked content:", error);
        setError({
          articles: "Failed to load liked articles.",
          videos: "Failed to load liked videos.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLikedContent();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center text-gray-900 mb-8"
        >
          Most Liked Content
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Most Liked Articles Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">
                Most Liked Articles
              </h3>
              {error.articles ? (
                <p className="text-red-500 text-center">{error.articles}</p>
              ) : mostLikedArticles.length === 0 ? (
                <p className="text-center text-gray-500">No liked articles available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {mostLikedArticles.map((article) => (
                    <motion.div
                      key={article._id}
                      whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                      className="bg-white shadow-lg rounded-lg overflow-hidden p-6"
                    >
                      <h5 className="text-lg font-bold">{article.title || "No Title"}</h5>
                      <p className="text-gray-600">{article.description || "No Description"}</p>
                      <Link to={`/posts/${article._id}`} className="btn btn-primary w-full mt-4">
                        Read More
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Most Liked Videos Section */}
            <div>
              <h3 className="text-2xl font-semibold text-red-600 text-center mb-6">
                Most Liked Videos
              </h3>
              {error.videos ? (
                <p className="text-red-500 text-center">{error.videos}</p>
              ) : mostLikedVideos.length === 0 ? (
                <p className="text-center text-gray-500">No liked videos available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {mostLikedVideos.map((video) => (
                    <motion.div
                      key={video._id}
                      whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                      className="bg-white shadow-lg rounded-lg overflow-hidden p-6"
                    >
                      <h5 className="text-lg font-bold">{video.title || "No Title"}</h5>
                      <p className="text-gray-600">{video.description || "No Description"}</p>
                      <Link to={`/posts/${video._id}`} className="btn btn-danger w-full mt-4">
                        Watch Video
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LikedContent;
