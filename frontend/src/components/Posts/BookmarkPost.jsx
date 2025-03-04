import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBookmark } from "react-icons/fa";
import { fetchBookmarkedPostsAPI } from "../../APIServices/posts/postsAPI"; 
import { Link } from "react-router-dom";

const BookmarkPost = () => {
  
  const {
    data: bookmarkedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmarked-posts"],
    queryFn: fetchBookmarkedPostsAPI,
  });
  console.log(bookmarkedPosts);
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">Failed to fetch bookmarked posts.</p>
      </div>
    );
  }

  // No bookmarked posts
  if (!bookmarkedPosts || bookmarkedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No bookmarked posts found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <FaBookmark className="text-orange-500" />
        Bookmarked Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedPosts.posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <Link to={`/posts/${post._id}`}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{
                  __html: post.description.substring(0, 100) + "...",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export {BookmarkPost};