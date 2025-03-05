import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaEye, FaComment, FaBookmark } from "react-icons/fa";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  dislikePostAPI,
  fetchPost,
  likePostAPI,
  bookmarkPostAPI,
  unbookmarkPostAPI,
} from "../../APIServices/posts/postsAPI";
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import { createCommentAPI } from "../../APIServices/comments/commentsAPI";

const PostDetails = () => {
  const { postId } = useParams();
  const [showAllComments, setShowAllComments] = useState(false);

  const { data, refetch: refetchPost } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
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

  const isBookmarked = data?.postFound?.bookmarkedBy?.some(
    (id) => id.toString() === userId?.toString()
  );

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
    likePostMutation.mutateAsync(postId).then(() => refetchPost());
  };

  const dislikesPostHandler = async () => {
    dislikePostMutation.mutateAsync(postId).then(() => refetchPost());
  };

  const bookmarkPostHandler = async () => {
    bookmarkMutation.mutateAsync(postId).then(() => refetchPost());
  };

  const unbookmarkPostHandler = async () => {
    unbookmarkMutation.mutateAsync(postId).then(() => refetchPost());
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = { content: values.content, postId };
      commentMutation.mutateAsync(data).then(() => {
        refetchPost();
        resetForm();
      });
    },
  });

  return (
    <div className="flex justify-start items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <img
          src={data?.postFound?.image}
          alt={data?.postFound?.description}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />

        <p className="text-gray-800 text-lg">{data?.postFound?.description}</p>

        <div className="flex justify-between items-center my-4">
        <div className="flex gap-6 items-center">
  <span
    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer 
    border rounded-full p-2 transition-all duration-300 hover:bg-gray-200"
    onClick={likePostHandler}
  >
    <FaThumbsUp className="text-xl" /> {data?.postFound?.likes?.length || 0}
  </span>

  <span
    className="flex items-center gap-2 text-gray-700 hover:text-red-600 cursor-pointer 
    border rounded-full p-2 transition-all duration-300 hover:bg-gray-200"
    onClick={dislikesPostHandler}
  >
    <FaThumbsDown className="text-xl" /> {data?.postFound?.dislikes?.length || 0}
  </span>

  <span className="flex items-center gap-2 text-gray-700 
    border rounded-full p-2 transition-all duration-300 hover:bg-gray-200">
    <FaEye className="text-xl" /> {data?.postFound?.viewers?.length || 0}
  </span>

  <span
    className={`flex items-center gap-2 cursor-pointer text-xl 
      border rounded-full p-2 transition-all duration-300 hover:bg-gray-200 ${
        isBookmarked ? "text-blue-600" : "text-gray-600"
      } hover:text-blue-500`}
    onClick={isBookmarked ? unbookmarkPostHandler : bookmarkPostHandler}
  >
    <FaBookmark />
  </span>
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
        <div className="mt-6">
  <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Comments</h2>
  <form onSubmit={formik.handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
    <textarea
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      rows="4"
      placeholder="Write a comment..."
      {...formik.getFieldProps("content")}
    ></textarea>
    {formik.touched.content && formik.errors.content && (
      <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>
    )}
    <button
      type="submit"
      className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      <FaComment className="text-lg" /> Add Comment
    </button>
  </form>

 {/* Comment List */}
<div className="space-y-4">
  {(showAllComments ? data?.postFound?.comments : data?.postFound?.comments?.slice(0, 5))?.map(
    (comment, index) => (
      <div
        key={index}
        className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md flex items-start gap-4 transition-all duration-300 hover:shadow-lg"
      >
        {/* User Avatar */}
        <img
          src={comment.author?.profileImage || "/default-avatar.png"}
          alt={comment.author?.username}
          className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
        />

        {/* Comment Content */}
        <div className="flex-1 text-left">
          {/* Username and Date on the same line */}
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

{/* Show More/Less Button */}
{data?.postFound?.comments?.length > 5 && (
  <button
    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 block mx-auto"
    onClick={() => setShowAllComments(!showAllComments)}
  >
    {showAllComments ? "Show Less" : "Show All Comments"}
  </button>
)}

</div>

      </div>
    </div>
  );
};

export default PostDetails;
