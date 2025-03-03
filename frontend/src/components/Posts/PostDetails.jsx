import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaEye, FaComment } from "react-icons/fa";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  dislikePostAPI,
  fetchPost,
  likePostAPI,
} from "../../APIServices/posts/postsAPI";
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import { createCommentAPI } from "../../APIServices/comments/commentsAPI";

const PostDetails = () => {
  const { postId } = useParams();

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

  const followUserMutation = useMutation({ mutationFn: followUserAPI });
  const unfollowUserMutation = useMutation({ mutationFn: unfollowUserAPI });
  const likePostMutation = useMutation({ mutationFn: likePostAPI });
  const dislikePostMutation = useMutation({ mutationFn: dislikePostAPI });
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
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <img
          src={data?.postFound?.image}
          alt={data?.postFound?.description}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1 cursor-pointer" onClick={likePostHandler}>
              <FaThumbsUp /> {data?.postFound?.likes?.length || 0}
            </span>
            <span className="flex items-center gap-1 cursor-pointer" onClick={dislikesPostHandler}>
              <FaThumbsDown /> {data?.postFound?.dislikes?.length || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaEye /> {data?.postFound?.viewers?.length || 0}
            </span>
          </div>
          
          {isFollowing ? (
            <button
              onClick={unfollowUserHandler}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <RiUserUnfollowFill /> Unfollow
            </button>
          ) : (
            <button
              onClick={followUserHandler}
              className="px-4 py-2 border border-black text-black bg-transparent rounded-md hover:bg-black hover:text-white flex items-center gap-2"
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
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
              <FaComment className="inline mr-1" /> Add Comment
            </button>
          </form>

          <div className="space-y-4">
            {data?.postFound?.comments?.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-gray-800">{comment.content}</p>
                <div className="mt-2 flex items-center text-gray-600 text-sm">
                  <span className="font-semibold">{comment.author?.username}</span>
                  <span className="ml-2 text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

// edited comments 