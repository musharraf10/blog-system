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
import axios from "axios";

import {loadStripe} from '@stripe/stripe-js';

const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [planName, setPlanName] = useState("");

  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const getPlan = async () => {
    try {
      const response = await axios.get(`${BackendServername}/users/fetchplan`, {
        withCredentials: true,
      });

      console.log("Fetched Plan:", response.data.plan);
      setPlanName(response.data.plan?.planName || "free"); // Avoid errors if `plan` is missing
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

  const handleContent = async () =>{
    const Stripe = await loadStripe('pk_test_51Qw85zFSLEamEKhDkKe5ZOLgaih2kgw3gUCTYooo2tAyP3NSEFPPt0jvOLgaf7SSYpEQDgQhqwHh5vTXoK7p3VBb00dhMvsm8f')
    const price = postId
  }
  
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
 

  // Check if a post is premium (price > 0)
  const isPremiumPost = (post) => {
    return post > 0;
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
    console.log(data)
    console.log("Fetched Posts Data:", data?.posts);

    
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

  return (
    <>
      {showHeaderFooter && <PublicNavbar />}
      <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="pt-16 pb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Latest Content
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore our collection of articles, tutorials, and resources to help you stay informed and inspired.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for content..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  className="clear-button"
                  onClick={clearFilters}
                >
                  <MdClear />
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
                {data?.posts?.map((post) => {
                  const isPremium = isPremiumPost(post.price);
                  
                  
                  return (
                    <div key={post._id} className="post-card bg-white">
                      {/* Premium Badge */}
                      {isPremium && (
                        <div className="premium-badge">
                          <FaCrown /> Premium
                        </div>
                      )}
                      
                      {/* Post Image */}
                      <div className="post-image-container">
                        <img
                          className="post-image"
                          src={post?.image}
                          alt={post?.price || "Post image"}
                        />
                        
                        {/* Bookmark Button */}
                       
                      </div>
                      
                      {isPremium && !isUserSubscribed && (
                        <div className="premium-overlay">
                          <FaLock className="premium-lock-icon" />
                          <p className="premium-message">
                            This is premium content. Subscribe to unlock.
                          </p>
                          <button 
                            className="unlock-button"
                            onClick={handleContent}
                          >
                            Subscribe Now
                          </button>
                        </div>
                      )}
                      
                      {/* Post Content */}
                      <Link 
                        to={`/posts/${post._id}`}
                        className="block"
                      >
                        <div className="post-content">
                          <h3 className="post-title">
                            {post?.refId.title || "Untitled Post"}
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