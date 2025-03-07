import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaEye, FaComment, FaBookmark, FaCrown, FaLock } from "react-icons/fa";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  dislikePostAPI,
  fetchPost,
  likePostAPI,
  bookmarkPostAPI,
  unbookmarkPostAPI,
  fetchAllPosts,
} from "../../APIServices/posts/postsAPI";
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import { createCommentAPI } from "../../APIServices/comments/commentsAPI";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import truncateString from "../../utils/truncateString";

const PostDetails = () => {
  const { postId } = useParams();
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [selectedPost, setSelectedPost] = useState(postId);

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

  const { data: postData, refetch: refetchPost } = useQuery({
    queryKey: ["post-details", selectedPost],
    queryFn: () => fetchPost(selectedPost),
  });

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userProfileAPI(),
  });

  const { isError, isLoading, data: allPostsData, refetch } = useQuery({
    queryKey: ["lists-posts", { ...filters, page }],
    queryFn: () =>
      fetchAllPosts({ ...filters, title: searchTerm, page, limit: 9 }),
  });
  const targetId = postData?.postFound?.author;
  const userId = profileData?.user?._id;

  const isFollowing = profileData?.user?.following?.some(
    (user) => user?._id?.toString() === targetId?.toString()
  );

  const isBookmarked = postData?.postFound?.bookmarkedBy?.some(
    (id) => id.toString() === userId?.toString()
  );

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 10); // Loads 10 more posts
  };

  const [showAllComments, setShowAllComments] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const followUserMutation = useMutation({ mutationFn: followUserAPI });
  const unfollowUserMutation = useMutation({ mutationFn: unfollowUserAPI });
  const likePostMutation = useMutation({ mutationFn: likePostAPI });
  const dislikePostMutation = useMutation({ mutationFn: dislikePostAPI });
  const bookmarkMutation = useMutation({ mutationFn: bookmarkPostAPI });
  const unbookmarkMutation = useMutation({ mutationFn: unbookmarkPostAPI });
  const commentMutation = useMutation({ mutationFn: createCommentAPI });

  const followUserHandler = async () => {
    followUserMutation.mutateAsync(targetId).then(() => refetchProfile());
  };

  const unfollowUserHandler = async () => {
    unfollowUserMutation.mutateAsync(targetId).then(() => refetchProfile());
  };

  const likePostHandler = async () => {
    likePostMutation.mutateAsync(selectedPost).then(() => refetchPost());
  };

  const dislikesPostHandler = async () => {
    dislikePostMutation.mutateAsync(selectedPost).then(() => refetchPost());
  };

  const bookmarkPostHandler = async () => {
    bookmarkMutation.mutateAsync(selectedPost).then(() => refetchPost());
  };

  const unbookmarkPostHandler = async () => {
    unbookmarkMutation.mutateAsync(selectedPost).then(() => refetchPost());
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = { content: values.content, postId: selectedPost };
      commentMutation.mutateAsync(data).then(() => {
        refetchPost();
        resetForm();
      });
    },
  });

  const isPremiumPost = (price) => {
    return price && price > 0;
  };

  const handleSubscribe = () => {
    localStorage.setItem("userSubscriptionStatus", "subscribed");
    setIsUserSubscribed(true);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-4">
    <div className="row w-100">
      {/* Left Column (Post Details) with Scroll */}
      <div className="col-md-8 col-12">
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: "110vh", overflowY: "auto" }}>
          <img
            src={postData?.postFound?.image}
            alt={postData?.postFound?.description}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-800 text-lg">{postData?.postFound?.description}</p>
  
          {/* Follow Button (Added Back) */}
          <div className="flex justify-between items-center my-4 flex-wrap">
            <div className="flex gap-4 items-center flex-wrap">
              <span className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer border rounded-full p-2 transition-all duration-300 hover:bg-gray-200" onClick={likePostHandler}>
                <FaThumbsUp className="text-xl" /> {postData?.postFound?.likes?.length || 0}
              </span>
              <span className="flex items-center gap-2 text-gray-700 hover:text-red-600 cursor-pointer border rounded-full p-2 transition-all duration-300 hover:bg-gray-200" onClick={dislikesPostHandler}>
                <FaThumbsDown className="text-xl" /> {postData?.postFound?.dislikes?.length || 0}
              </span>
              <span className="flex items-center gap-2 text-gray-700 border rounded-full p-2 transition-all duration-300 hover:bg-gray-200">
                <FaEye className="text-xl" /> {postData?.postFound?.viewers?.length || 0}
              </span>
              <span className={`flex items-center gap-2 cursor-pointer text-xl border rounded-full p-2 transition-all duration-300 hover:bg-gray-200 ${isBookmarked ? "text-blue-600" : "text-gray-600"} hover:text-blue-500`} onClick={isBookmarked ? unbookmarkPostHandler : bookmarkPostHandler}>
                <FaBookmark />
              </span>
            </div>
  
            {/* Follow Button */}
            <button
              className={`px-4 py-2 text-white text-sm font-bold rounded-md transition-all duration-300 ${
                isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={isFollowing ? unfollowUserHandler : followUserHandler}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
  
          {/* Comments Section (Fully Functional & Scrollable) */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Comments</h2>
            <form onSubmit={formik.handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                rows="4"
                placeholder="Write a comment..."
                {...formik.getFieldProps("content")}
              ></textarea>
              <button type="submit" className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                <FaComment className="text-lg" /> Add Comment
              </button>
            </form>
  
            {/* Comments List (Show More Working) */}
            <div className="space-y-4">
              {(showAllComments ? postData?.postFound?.comments : postData?.postFound?.comments?.slice(0, 5))?.map(
                (comment, index) => (
                  <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md flex items-start gap-4 transition-all duration-300 hover:shadow-lg">
                    <img
                      src={comment.author?.profileImage || "/default-avatar.png"}
                      alt={comment.author?.username}
                      className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold">
                        <span>{comment.author?.username}</span>
                        <span className="text-gray-500 text-xs">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mt-1 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                )
              )}
            </div>
  
            {postData?.postFound?.comments?.length > 5 && (
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 block mx-auto" onClick={() => setShowAllComments(!showAllComments)}>
                {showAllComments ? "Show Less" : "Show All Comments"}
              </button>
            )}
          </div>
        </div>
      </div>
  
      {/* Right Column (Scrollable List) */}
      <div className="col-md-4 col-12 mt-4 mt-md-0">
        <div className="bg-white rounded-xl shadow-lg p-4" style={{ height: "110vh", overflowY: "auto" }}>
          <h2 className="h5 text-dark mb-4">List</h2>
  
          {isError && <AlertMessage type="error" message="Something went wrong!" />}
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              <div className="loading-spinner"></div>
            </div>
          ) : allPostsData?.posts?.length <= 0 ? (
            <NoDataFound text="No Posts Available" />
          ) : (
            <div className="mb-4">
              {allPostsData?.posts?.map((post) => {
                const isPremium = isPremiumPost(post.price);
                return (
                  <div key={post._id} className="d-flex p-3 rounded-lg bg-white shadow-sm mb-3 border-bottom position-relative flex-wrap" onClick={() => setSelectedPost(post._id)}>
                    {/* Post Image */}
                    <div className="flex-shrink-0">
                      <img className="w-20 h-20 object-cover rounded-lg border" src={post?.refId.thumbnail} alt={post?.title || "Post image"} />
                    </div>
  
                    {/* Post Content */}
                    <div className="flex-grow ps-3 position-relative w-100">
                      {/* Title */}
                      <h3 className="h6 text-dark text-truncate">{post?.refId.title || "Untitled Post"}</h3>
  
                      {/* Status, Date & Premium */}
                      <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-xs font-weight-bold text-primary">{post?.status}</span>
                          {isPremium && (
                            <div className="text-primary text-xs font-weight-bold">
                              <FaCrown className="text-lg" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default PostDetails;
