import { useMutation, useQuery } from "@tanstack/react-query";

import React from "react";
//import { useParams } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
  FaComment,
  FaBookmark,
} from "react-icons/fa";

import  { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

//import { FaThumbsUp, FaThumbsDown, FaEye, FaComment, FaBookmark, FaCrown, FaLock } from "react-icons/fa";

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

  const targetId = data?.postFound?.author;
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
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <img
          src={data?.postFound?.image}
          className="w-full max-w-lg h-64 object-cover rounded-lg mb-2 border-2   mx-auto transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl block"
        />

        <p className="text-lg mb-4 text-left">{data?.postFound?.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={likePostHandler}
            >
              <FaThumbsUp /> {data?.postFound?.likes?.length || 0}
            </span>
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={dislikesPostHandler}
            >
              <FaThumbsDown /> {data?.postFound?.dislikes?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {data?.postFound?.viewers?.length || 0}
            </span>
            <span
              className={`flex items-center gap-1 cursor-pointer ${isBookmarked ? "text-blue-600" : "text-gray-600"
                }`}
              onClick={isBookmarked ? unbookmarkPostHandler : bookmarkPostHandler}
            >
              <FaBookmark />
            </span>

          </div>

          {isFollowing ? (
            <button
              onClick={unfollowUserHandler}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#2563EB] hover:text-black flex items-center gap-1"
            >
              <RiUserUnfollowFill /> Unfollow
            </button>
          ) : (
            <button
              onClick={followUserHandler}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#2563EB] hover:text-black flex items-center gap-1"
            >
              <RiUserFollowLine /> Follow
            </button>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <form onSubmit={formik.handleSubmit} className="mb-6">
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Write a comment..."
              {...formik.getFieldProps("content")}
            ></textarea>
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 mb-2">{formik.errors.content}</div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-[#1E40AF] hover:to-[#2563EB] hover:text-black"
            >
              <FaComment className="inline mr-1" /> Add Comment
            </button>
          </form>


<div 
  className="space-y-4 p-2 border rounded-lg"
  style={{ maxHeight: "250px", overflowY: data?.postFound?.comments?.length > 3 ? "auto" : "visible" }}
>
{data?.postFound?.comments?.slice().reverse().map((comment, index) => (
  <>
    <div key={index} className="flex items-start space-x-4 p-2 bg-gray-100 rounded-lg shadow-sm text-left">
      {/* Profile Picture */}
      <img
        src={comment.author?.profilePic } // Default profile pic
        alt={comment.author?.username}
        className="w-10 h-10 rounded-full object-cover mt-2"
      />

      {/* Comment Content */}
      <div className="flex-1">
        {/* Author Name & Date */}
        <div className="mt-2 flex items-center text-sm">
          <span className="font-bold text-blue-600">{comment.author?.username}</span>
          <span className="ml-2 text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-800 font-semibold">{comment.content}</p>
      </div>

      {isFollowing ? (
        <button
          onClick={unfollowUserHandler}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2 transition duration-200"
        >
          <RiUserUnfollowFill className="text-lg" /> Unfollow
        </button>
      ) : (
        <button
          onClick={followUserHandler}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2 transition duration-200"
        >
          <RiUserFollowLine className="text-lg" /> Follow
        </button>
      )}
    </div>
  </>
))}
</div>


  {/* Right Column (List of Posts) */}
  <div className="col-md-4 col-12 mt-4 mt-md-0">
  <div className="bg-white rounded-xl shadow-lg p-4 h-screen overflow-y-auto scrollbar-hide">
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
            <div
              key={post._id}
              className="d-flex p-3 rounded-lg bg-white shadow-sm mb-3 border-bottom position-relative"
              onClick={() => setSelectedPost(post._id)}
            >
              {/* Post Image (Left) */}
              <div className="flex-shrink-0">
                <img
                  className="w-20 h-20 object-cover rounded-lg border"
                  src={post?.image}
                  alt={post?.title || "Post image"}
                />
              </div>

             
              <div className="flex-grow ps-3 position-relative">
                
                <h3 className="h6 text-dark text-truncate">{post?.refId.title || "Untitled Post"}</h3>

                
                <p className="text-muted text-truncate">{truncateString(post?.description || "", 50)}</p>
                
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-xs font-weight-bold text-primary">{post?.status}</span>
                  <span className="text-xs text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Premium Badge (Bottom-Right) */}
                {isPremium && (
                  <div className="position-absolute bottom-0 end-0 bg-gradient-to-r from-primary to-blue text-primary text-xs font-weight-bold px-2 py-1 rounded-circle shadow-sm">
                    <FaCrown className="text-lg" />
                  </div>
                )}
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
</div>
  );
};

export default PostDetails;