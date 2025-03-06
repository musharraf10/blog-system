import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import "./postCss.css";
import { deletePostAPI, fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import { FaSearch, FaBookmark, FaLock, FaCrown } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import truncateString from "../../utils/truncateString";
import { useLocation } from "react-router-dom";
import PublicNavbar from "../Navbar/PublicNavbar";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

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



  // Simulate checking if user is subscribed
  useEffect(() => {
    const userSubscriptionStatus = localStorage.getItem("userSubscriptionStatus");
    setIsUserSubscribed(userSubscriptionStatus === "subscribed");
  }, []);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedPosts")) || [];
    setBookmarkedPosts(savedBookmarks);
  }, []);

  const toggleBookmark = (postId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let updatedBookmarks;
    if (bookmarkedPosts.includes(postId)) {
      updatedBookmarks = bookmarkedPosts.filter(id => id !== postId);
    } else {
      updatedBookmarks = [...bookmarkedPosts, postId];
    }
    setBookmarkedPosts(updatedBookmarks);
    localStorage.setItem("bookmarkedPosts", JSON.stringify(updatedBookmarks));
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

  // Function to simulate subscription
  const handleSubscribe = () => {
    localStorage.setItem("userSubscriptionStatus", "subscribed");
    setIsUserSubscribed(true);
  };

  // Check if a post is premium (price > 0)
  const isPremiumPost = (post) => {
    return post.price > 0;
  };

  // Generate pagination buttons
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

  // Separate the posts into premium and non-premium
  const premiumPosts = data?.posts?.filter(isPremiumPost);
  const nonPremiumPosts = data?.posts?.filter(post => !isPremiumPost(post));

  return (
    <>
      {showHeaderFooter && <PublicNavbar />}
      <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="pt-16 pb-8">
          <motion.h1
      initial={{ opacity: 0, y: 50 }} // Start faded out and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
    >
      Discover Our Latest Content
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }} // Start faded out and slightly lower
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} // Smooth transition
      className="text-lg text-gray-600 max-w-3xl mx-auto text-center"
    >
      Explore our collection of articles, tutorials, and resources to help you stay informed and inspired.
    </motion.p>
          </div>
         {/* Search Bar */}
<div className="relative flex items-center justify-center mt-6">
  <form 
    onSubmit={handleSearchSubmit} 
    className="relative flex items-center w-full max-w-lg bg-gradient-to-r from-blue-50 to-blue-50 rounded-full shadow-lg border border-gray-300 transition-all focus-within:border-blue-600 focus-within:shadow-xl"
  >
    {/* Search Icon */}
    <FaSearch className="absolute left-4 text-blue-600 text-lg animate-pulse" />

    {/* Input Field */}
    <input
      type="text"
      placeholder="Search for content..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full py-3 pl-12 pr-12 text-gray-700 placeholder-gray-500 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
    />

    {/* Clear Button */}
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
             
             <div className="pt-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center mt-5">
        Free Content
      </h2>

      {/* Carousel */}
      <Slider {...settings} className="relative mt-5">
        {nonPremiumPosts?.map((post) => {
          const isBookmarked = bookmarkedPosts.includes(post._id);
          return (
            <div key={post._id} className="px-3">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
                {/* Image + Bookmark */}
                <div className="relative">
                  <img
                    className="w-full h-60 object-cover rounded-md"
                    src={post?.image}
                    alt={post?.title || "Post image"}
                  />
                  <button
                    className={`absolute top-3 right-3 text-xl ${
                      isBookmarked ? "text-red-500" : "text-gray-500"
                    } transition hover:scale-110`}
                    onClick={(e) => toggleBookmark(post._id, e)}
                    aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    <FaBookmark />
                  </button>
                </div>

                {/* Content */}
                <Link to={`/posts/${post._id}`} className="block mt-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {post?.title || "Untitled post"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {truncateString(post?.description || "", 120)}
                  </p>
                  <div className="text-gray-500 text-xs mt-2">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
              {/* Premium Posts */}
              {premiumPosts?.length > 0 && (
                <div className="pt-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mt-3" >Premium Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-5">
                    {premiumPosts?.map((post) => {
                      const isBookmarked = bookmarkedPosts.includes(post._id);
                      return (
                        <div key={post._id} className="post-card bg-white">
                          {/* Premium Badge */}
                          <div className="premium-badge">
                            <FaCrown /> Premium
                          </div>
                          
                          {/* Post Image */}
                          <div className="post-image-container">
                            <img
                              className="post-image"
                              src={post?.image}
                              alt={post?.price || "Post image"}
                            />
                            
                            {/* Bookmark Button */}
                            <button 
                              className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
                              onClick={(e) => toggleBookmark(post._id, e)}
                              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                            >
                              <FaBookmark />
                            </button>
                          </div>
                          
                          {/* Premium Overlay for Locked Content */}
                          {isPremiumPost(post) && !isUserSubscribed && (
                            <div className="premium-overlay">
                              <FaLock className="premium-lock-icon" />
                              <p className="premium-message">
                                This is premium content. Subscribe to unlock.
                              </p>
                              <button 
                                className="unlock-button"
                                onClick={handleSubscribe}
                              >
                                Subscribe Now
                              </button>
                            </div>
                          )}
                          
                          {/* Post Content */}
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PostsList;
