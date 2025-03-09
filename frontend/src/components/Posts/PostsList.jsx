import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import "./postCss.css";
import { deletePostAPI, fetchAllPosts, fetchMostLikedArticles, fetchMostLikedVideos, fetchTrendingArticles, fetchTrendingVideos } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import { FaSearch, FaBookmark, FaLock, FaCrown } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import truncateString from "../../utils/truncateString";
import { useLocation } from "react-router-dom";
import PublicNavbar from "../Navbar/PublicNavbar";
import axios from "axios";



import { loadStripe } from '@stripe/stripe-js';
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrendingPosts from "./TrendingPosts";
import LikedContent from "./LikedContent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [planName, setPlanName] = useState("");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error1, setError] = useState({ articles: null, videos: null });
   const [mostLikedVideos, setMostLikedVideos] = useState([]);
    const [mostLikedArticles, setMostLikedArticles] = useState([]);

      const [trendingVideos, setTrendingVideos] = useState([]);
      const [trendingArticles, setTrendingArticles] = useState([]);
      const [loading1, setLoading1] = useState(true);
   


  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowLeft size={20} />
    </button>
  );
  
  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowRight size={20} />
    </button>
  );

  const CustomPrevArrowV = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowLeft size={20} />
    </button>
  );
  
  const CustomNextArrowV = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowRight size={20} />
    </button>
  );

  const CustomPrevArrowTA = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowLeft size={20} />
    </button>
  );
  
  const CustomNextArrowTA = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
    >
      <FaArrowRight size={20} />
    </button>
  );

  // Slick Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 posts at a time on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3, // Adjust based on your design
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay if needed
    autoplaySpeed: 1000,
    prevArrow: <CustomPrevArrow />, // Added custom previous arrow
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const settings2 = {
    dots: true,
    infinite: true,
    speed: 1000, // Slow transition for smooth effect
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Slower autoplay
    prevArrow: <CustomPrevArrowV />, // Custom Previous Arrow
    nextArrow: <CustomNextArrowV />, // Custom Next Arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings3 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrowTA />,
    nextArrow: <CustomNextArrowTA />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  


  const getPlan = async () => {
    try {
      const response = await axios.get(`${BackendServername}/users/fetchplan`, {
        withCredentials: true,
      });

      console.log("Fetched Plan:", response.data.plan);
      setPlanName(response.data.plan?.planName || "Free");
    } catch (error) {
      console.error("Error fetching plan:", error);
    }
  };

  useEffect(() => {
    getPlan();
  }, []);

  useEffect(() => {
    setIsUserSubscribed(planName !== "Free");
  }, [planName]);

  const handleContent = async (postId, price) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    try {
      const response = await axios.post(
        `${BackendServername}/payments/create-checkout-session`,
        {
          postId,
          price,
        },
        { withCredentials: true }
      );

      const { sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const location = useLocation();
  const showHeaderFooter = location.pathname.includes("/posts");

  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["lists-posts", { ...filters, page }],
    queryFn: () =>
      fetchAllPosts({ ...filters, title: searchTerm, page, limit: 9 }),
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const toggleBookmark = (postId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isPremiumPost = (post) => {
    return post.price > 0;
  };

  const renderPagination = () => {
    if (!data || !data.totalPages) return null;

    const totalPages = data.totalPages;
    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        className="page-button"
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        &lt;
      </button>
    );

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 1 && i <= page + 1)
      ) {
        buttons.push(
          <button
            key={i}
            className={`page-button ${page === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === page - 2 && page > 3) ||
        (i === page + 2 && page < totalPages - 2)
      ) {
        buttons.push(<span key={`ellipsis-${i}`}>...</span>);
      }
    }

    // Next button
    buttons.push(
      <button
        key="next"
        className="page-button"
        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    );

    return <div className="pagination">{buttons}</div>;
  };

  const premiumPosts = data?.posts?.filter(isPremiumPost);
  const nonPremiumPosts = data?.posts?.filter(post => !isPremiumPost(post));



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
            setLoading1(false);
          }
        };
        fetchTrending();
      }, []);

  return (
    <>
      {showHeaderFooter && <PublicNavbar />}
      <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="pt-16 pb-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Discover Our Latest Content
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center"
            >
              Explore our collection of articles, tutorials, and resources to help you stay informed and inspired.
            </motion.p>
          </div>
          {/* Search Bar */}
          <div className="relative flex items-center justify-center mt-6">
            <form
              onSubmit={handleSearchSubmit}
              className="relative mb-5 flex items-center w-full max-w-lg bg-gradient-to-r from-blue-50 to-blue-100 rounded-full shadow-lg border border-gray-300 transition-all focus-within:border-blue-600 focus-within:shadow-xl"
            >
              <FaSearch className="absolute left-4 text-blue-600 text-lg animate-pulse" />
              <input
                type="text"
                placeholder="Search for content..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-3 pl-12 pr-12  text-gray-700 placeholder-gray-500 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110"
                  onClick={clearFilters}
                >
                  <MdClear className="text-xl" />
                </button>
              )}
            </form>
          </div>

          {/* Error and Loading States */}
          {isError && <AlertMessage type="error" message="Something happened" />}

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : data?.posts?.length <= 0 ? (
            <NoDataFound text="No Posts Found" />
          ) : (
            <>
              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {nonPremiumPosts?.map((post) => {
                  const isPremium = isPremiumPost(post);
                  const isBookmarked = bookmarkedPosts.includes(post._id);

                  return (
                    <div key={post._id} className="post-card bg-white">
                      {isPremium && (
                        <div className="premium-badge">
                          <FaCrown />
                        </div>
                      )}
                      <div className="post-image-container">
    <img
        className="post-image"
        src={post?.refId?.thumbnail || "/default-image.jpg"}  // Provide a fallback image
        alt={post?.price || "Post image"}
    />
                        {/* <button
                          className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
                          onClick={(e) => toggleBookmark(post._id, e)}
                          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                          <FaBookmark />
                        </button> */}
                      </div>
                      {isPremium && !isUserSubscribed && (
                        <div className="premium-overlay">
                          <FaLock className="premium-lock-icon" />
                          <p className="premium-message">
                            This is premium content. Subscribe or buy this post to unlock.
                          </p>
                          <button
                            className="unlock-button"
                            onClick={() => handleContent(post._id, post.price)}
                          >
                            Buy Post for ${post.price}
                          </button>
                        </div>
                      )}
                      <Link
                        to={`/posts/${post._id}`}
                        className="block"
                      >
                        <div className="post-content">
                        <h3 className="post-title">
                           {post?.refId?.title || "Untitled Post"}
                        </h3>
                          <p className="post-excerpt">
                            {truncateString(post?.description || "", 120)}
                          </p>
                          <div className="post-meta">
                            <span className="post-date">
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <span className={`post-status ${
                              post?.status === 'published' ? 'status-published' : 'status-draft'
                            }`}>
                              {post?.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Premium Posts */}
              {premiumPosts?.length > 0 && (
                <div className="pt-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mt-3">Premium Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-5">
                    {premiumPosts?.map((post) => {
                      const isBookmarked = bookmarkedPosts.includes(post._id);
                      return (
                        <div key={post._id} className="post-card bg-white">
                          <div className="premium-badge">
                            <FaCrown /> Premium
                          </div>
                          <div className="post-image-container">
                            <img
                              className="post-image"
                              src={post?.image}
                              alt={post?.price || "Post image"}
                            />
                            <button
                              className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
                              onClick={(e) => toggleBookmark(post._id, e)}
                              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                            >
                              <FaBookmark />
                            </button>
                          </div>
                          {isPremiumPost(post) && !isUserSubscribed && (
                            <div className="premium-overlay">
                              <FaLock className="premium-lock-icon" />
                              <p className="premium-message">
                                This is premium content. Subscribe to unlock.
                              </p>
                              <button
                                className="unlock-button"
                                onClick={() => handleContent(post._id, post.price)}
                              >
                                Subscribe Now
                              </button>
                            </div>
                          )}
                          <Link to={`/posts/${post._id}`} className="block">
                            <div className="post-content">
                              <h3 className="post-title">{post?.title || "Untitled post"}</h3>
                              <p className="post-excerpt">
                                {truncateString(post?.description || "", 120)}
                              </p>
                              <div className="post-meta">
                                <span className="post-date">
                                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {renderPagination()}


              <div className=" relative mb-12">
      <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">
        Most Liked Articles
      </h3>
      {error1.articles ? (
        <p className="text-red-500 text-center">{error1.articles}</p>
      ) : mostLikedArticles.length === 0 ? (
        <p className="text-center text-gray-500">No liked articles available.</p>
      ) : (
        <Slider {...settings1}>
          {mostLikedArticles.map((article) => (
            <motion.div
              key={article._id}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mx-2"
            >
              <h5 className="text-lg font-bold">{article.title || "No Title"}</h5>
              <p className="text-gray-600">{article.description || "No Description"}</p>
              <Link to={`/posts/${article._id}`} className="btn btn-primary w-full mt-4">
                Read More
              </Link>
            </motion.div>
          ))}
        </Slider>
      )}
    </div>


    <div className="relative mb-12">
      <h3 className="text-2xl font-semibold text-red-600 text-center mb-6">
        Most Liked Videos
      </h3>
      {error1.videos ? (
        <p className="text-red-500 text-center">{error1.videos}</p>
      ) : mostLikedVideos.length === 0 ? (
        <p className="text-center text-gray-500">No liked videos available.</p>
      ) : (
        <Slider {...settings2}>
          {mostLikedVideos.map((video) => (
            <motion.div
              key={video._id}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mx-2"
            >
              <h5 className="text-lg font-bold">{video.title || "No Title"}</h5>
              <p className="text-gray-600">{video.description || "No Description"}</p>
              <Link to={`/posts/${video._id}`} className="btn btn-danger w-full mt-4">
                Watch Video
              </Link>
            </motion.div>
          ))}
        </Slider>
      )}
    </div>


    <div className="mb-5 relative">
        <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">Trending Articles</h3>
        {loading1 ? (
          <p className="text-center text-secondary mt-3">Loading...</p>
        ) : trendingArticles.length === 0 ? (
          <p className="text-center text-muted mt-3">No trending articles available.</p>
        ) : (
          <Slider {...settings3}>
            {trendingArticles.map((article) => (
              <motion.div
                key={article._id}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                className="card border-0 shadow-lg rounded overflow-hidden p-3 mx-2"
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{article.refId.title || "No Title"}</h5>
                  <p className="card-text text-muted">{article.refId.description || "No Description"}</p>
                  <Link to={`/posts/${article._id}`} className="btn btn-primary w-100">
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </Slider>
        )}
      </div>


      <div className="mb-5 relative">
        <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">Trending Videos</h3>
        {loading1 ? (
          <p className="text-center text-secondary mt-3">Loading...</p>
        ) : trendingVideos.length === 0 ? (
          <p className="text-center text-muted mt-3">No trending videos available.</p>
        ) : (
          <Slider {...settings3}>
            {trendingVideos.map((video) => (
              <motion.div
                key={video._id}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
                className="card border-0 shadow-lg rounded overflow-hidden p-3 mx-2"
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{video.title || "No Title"}</h5>
                  <p className="card-text text-muted">{video.description || "No Description"}</p>
                  <Link to={`/posts/${video._id}`} className="btn btn-danger w-100">
                    Watch Video
                  </Link>
                </div>
              </motion.div>
            ))}
          </Slider>
        )}
      </div>
  


              {/* <LikedContent /> */}
              {/* <TrendingPosts /> */}

            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PostsList;