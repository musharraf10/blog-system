
// import { useEffect, useState } from "react";
// import { fetchTrendingVideos, fetchTrendingArticles } from "../../APIServices/posts/postsAPI";
// import { motion } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TrendingPosts = () => {
//   const [trendingVideos, setTrendingVideos] = useState([]);
//   const [trendingArticles, setTrendingArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrending = async () => {
//       try {
//         const videos = await fetchTrendingVideos();
//         const articles = await fetchTrendingArticles();

//         console.log("API Trending Videos Response:", videos);
//         console.log("API Trending Articles Response:", articles);

//         setTrendingVideos(videos?.data || []);
//         setTrendingArticles(articles?.data || []);
//       } catch (error) {
//         console.error("Error fetching trending posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrending();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center fw-bold text-dark">Trending Posts</h2>

//       {/* Trending Articles Section */}
//       <div className="mb-5">
//         <h3 className="text-center text-primary mt-4">Trending Articles</h3>
//         {loading ? (
//           <p className="text-center text-secondary mt-3">Loading...</p>
//         ) : trendingArticles.length === 0 ? (
//           <p className="text-center text-muted mt-3">No trending articles available.</p>
//         ) : (
//           <div className="row mt-4">
//             {trendingArticles.map((article) => (
//               <div key={article._id} className="col-md-4 mb-4">
//                 <motion.div
//                   whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
//                   className="card border-0 shadow-lg rounded overflow-hidden"
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">{article.title || "No Title"}</h5>
//                     <p className="card-text text-muted">{article.description || "No Description"}</p>
//                     <a href={article.url || "#"} className="btn btn-primary w-100">
//                       Read More
//                     </a>
//                   </div>
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Trending Videos Section */}
//       <div className="mb-5">
//         <h3 className="text-center text-danger mt-4">Trending Videos</h3>
//         {loading ? (
//           <p className="text-center text-secondary mt-3">Loading...</p>
//         ) : trendingVideos.length === 0 ? (
//           <p className="text-center text-muted mt-3">No trending videos available.</p>
//         ) : (
//           <div className="row mt-4">
//             {trendingVideos.map((video) => (
//               <div key={video._id} className="col-md-4 mb-4">
//                 <motion.div
//                   whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
//                   className="card border-0 shadow-lg rounded overflow-hidden"
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">{video.title || "No Title"}</h5>
//                     <p className="card-text text-muted">{video.description || "No Description"}</p>
//                     <a href={video.url || "#"} className="btn btn-danger w-100">
//                       Watch Video
//                     </a>
//                   </div>
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default TrendingPosts;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTrendingVideos, fetchTrendingArticles } from "../../APIServices/posts/postsAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const TrendingPosts = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const videos = await fetchTrendingVideos();
        const articles = await fetchTrendingArticles();

        console.log("API Trending Videos Response:", videos);
        console.log("API Trending Articles Response:", articles);

        setTrendingVideos(videos?.data || []);
        setTrendingArticles(articles?.data || []);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-dark">Trending Posts</h2>

      {/* Trending Articles Section */}
      <div className="mb-5">
        <h3 className="text-center text-primary mt-4">Trending Articles</h3>
        {loading ? (
          <p className="text-center text-secondary mt-3">Loading...</p>
        ) : trendingArticles.length === 0 ? (
          <p className="text-center text-muted mt-3">No trending articles available.</p>
        ) : (
          <div className="row mt-4">
            {trendingArticles.map((article) => (
              <div key={article._id} className="col-md-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                  className="card border-0 shadow-lg rounded overflow-hidden"
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{article.title || "No Title"}</h5>
                    <p className="card-text text-muted">{article.description || "No Description"}</p>
                    <Link to={`/posts/${article._id}`} className="btn btn-primary w-100">
                      Read More
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Videos Section */}
      <div className="mb-5">
        <h3 className="text-center text-danger mt-4">Trending Videos</h3>
        {loading ? (
          <p className="text-center text-secondary mt-3">Loading...</p>
        ) : trendingVideos.length === 0 ? (
          <p className="text-center text-muted mt-3">No trending videos available.</p>
        ) : (
          <div className="row mt-4">
            {trendingVideos.map((video) => (
              <div key={video._id} className="col-md-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                  className="card border-0 shadow-lg rounded overflow-hidden"
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{video.title || "No Title"}</h5>
                    <p className="card-text text-muted">{video.description || "No Description"}</p>
                    <Link to={`/posts/${video._id}`} className="btn btn-danger w-100">
                      Watch Video
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPosts;
