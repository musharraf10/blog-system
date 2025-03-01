import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import "./postCss.css";
import { deletePostAPI, fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import PostCategory from "../Category/PostCategory";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";
import { FaSearch, FaBookmark } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import truncateString from "../../utils/truncateString";
import { useLocation } from "react-router-dom";
import PublicNavbar from "../Navbar/PublicNavbar";

const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedPosts")) || [];
    setBookmarkedPosts(savedBookmarks);
  }, []);

  const toggleBookmark = (postId) => {
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

  console.log(data);

  const handleCategoryFilter = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
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

  const { data: categories } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  return (
    <>
      {showHeaderFooter && <PublicNavbar />}
      <section className="overflow-hidden">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16">Blog</h1>
          <h2 className="text-4xl font-bold font-heading mb-10">Latest articles</h2>
          
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-2 mb-4">
            <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow p-2 text-sm focus:outline-none"
              />
              <button type="submit" className="p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg">
                <FaSearch className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={clearFilters}
              className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
            >
              <MdClear className="h-4 w-4" />
              Clear Filters
            </button>
          </form>
          
          {data?.posts?.length <= 0 && <NoDataFound text="No Post Found" />}
          {isError && <AlertMessage type="error" message="Something happened" />}
          {isLoading && <AlertMessage type="loading" message="Loading please wait" />}
          
          <PostCategory categories={categories} onCategorySelect={handleCategoryFilter} onClearFilters={clearFilters} />
          
          <div className="flex flex-wrap mb-32 -mx-4">
            {data?.posts?.map((post) => (
              <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3">
                  <Link to={`/posts/${post._id}`} className="block relative" style={{ height: 240 }}>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src={post?.image}
                      alt={post?._id}
                    />
                  </Link>
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{
                        __html: truncateString(post?.description, 200),
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                        {post?.category?.categoryName}
                      </div>
                      <button
                        onClick={() => toggleBookmark(post._id)}
                        className={`text-gray-500 hover:text-orange-500 ml-auto ${
                          bookmarkedPosts.includes(post._id) ? "text-orange-500" : ""
                        }`}
                      >
                        <FaBookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostsList;


// original