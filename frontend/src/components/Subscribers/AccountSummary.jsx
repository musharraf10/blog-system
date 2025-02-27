import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaCommentDots,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  sendEmailVerificatonTokenAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { getMyEarningsAPI } from "../../APIServices/earnings/earningsAPI";

const AccountSummaryDashboard = () => {
  const [activeTab, setActiveTab] = useState("followers");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const hasEmail = data?.user?.email;
  const hasPlan = data?.user?.hasSelectedPlan;
  const isEmailVerified = data?.user?.isEmailVerified;
  const isCurator = data?.user?.role === "curator";
  const userRole = data?.user?.role || "subscriber"; 
  const stats = isCurator ? [
    { 
      icon: <FaEye />, 
      label: "Views", 
      value: data?.user?.posts?.reduce((total, post) => total + post.viewers.length, 0) || 0, 
      bgColor: "bg-blue-500", 
      key: "views" 
    },
    { 
      icon: <FaDollarSign />, 
      label: "Earnings", 
      value: `$${data?.earnings?.reduce((acc, curr) => acc + curr.amount, 0)?.toFixed(2) || "0.00"}`, 
      bgColor: "bg-green-500", 
      key: "earnings" 
    },
    { 
      icon: <FaUsers />, 
      label: "Followers", 
      value: data?.user?.followers?.length || 0, 
      bgColor: "bg-purple-500", 
      key: "followers" 
    },
    { 
      icon: <FaThumbsUp />, 
      label: "Likes", 
      value: data?.user?.posts?.reduce((total, post) => total + post.likes.length, 0) || 0, 
      bgColor: "bg-yellow-500", 
      key: "likes" 
    },
    { 
      icon: <FaThumbsDown />, 
      label: "Dislikes", 
      value: data?.user?.posts?.reduce((total, post) => total + post.dislikes.length, 0) || 0, 
      bgColor: "bg-red-500", 
      key: "dislikes" 
    },
    { 
      icon: <FaUsers />, 
      label: "Following", 
      value: data?.user?.following?.length || 0, 
      bgColor: "bg-indigo-500", 
      key: "following" 
    },
    { 
      icon: <FaFlag />, 
      label: "Posts", 
      value: data?.user?.posts?.length || 0, 
      bgColor: "bg-pink-500", 
      key: "posts" 
    },
    { 
      icon: <FaCommentDots />, 
      label: "Comments", 
      value: data?.user?.posts?.reduce((total, post) => total + post.comments.length, 0) || 0, 
      bgColor: "bg-teal-500", 
      key: "comments" 
    },
  ] : [];

  const verificationTokenMutation = useMutation({
    mutationKey: ["send-email-verification-token"],
    mutationFn: sendEmailVerificatonTokenAPI,
  });

  const handleSendVerificationEmail = async () => {
    verificationTokenMutation.mutate();
  };

  return (
    <div className="p-4">
      <p className="font-bold text-2xl text-gray-800 mb-4">
        Welcome Back: {data?.user?.username}
      </p>

      {/* Verification Messages - Always Visible */}
      {verificationTokenMutation.isPending ? (
        <AlertMessage type="loading" message="Email sending loading..." />
      ) : verificationTokenMutation.isError ? (
        <AlertMessage type="error" message={verificationTokenMutation?.error?.message || "An error occurred"} />
      ) : verificationTokenMutation.isSuccess ? (
        <AlertMessage type="success" message={verificationTokenMutation?.data?.message} />
      ) : null}

      {!hasPlan && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Plan Selection Required</p>
          <p>
            Please <Link to={`/${userRole}/pricing`} className="underline text-yellow-800">select a plan</Link> to continue using our services.
          </p>
        </div>
      )}

      {!isEmailVerified && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Account Verification Needed</p>
          <p>
            Your account is not verified. Please <button onClick={handleSendVerificationEmail} className="underline text-red-800">verify your account</button> for full access.
          </p>
        </div>
      )}

      {!hasEmail && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p className="font-bold">Email Required</p>
          <p>
            Please <Link to={`/${userRole}/add-email`} className="underline text-blue-800">add an email</Link> to your account for important notifications.
          </p>
        </div>
      )}

      {/* Locked Content Overlay for Non-Curators */}
      {!isCurator ? (
        <div className="relative">
          {/* Blurred Content Background */}
          <div className="filter blur-sm pointer-events-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-500 text-white rounded-lg shadow-lg p-6 h-24"></div>
              ))}
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg h-64"></div>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <FaLock className="text-6xl text-white mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Content Locked</h3>
            <p className="text-white text-center mb-4 max-w-md px-4">
              This dashboard is exclusively available to curators. Become a curator to unlock detailed analytics and insights.
            </p>
            <Link
              to="/subscriber/settings/become-creator"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-150"
            >
              Become a Curator
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Content for Curators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {stats.map((stat) => (
              <div
                key={stat.key}
                onClick={() => setActiveTab(stat.key)}
                className={`${stat.bgColor} text-white rounded-lg shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-transform duration-150 ${activeTab === stat.key ? 'ring-4 ring-white' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{stat.icon}</div>
                  <div>
                    <div className="text-xl font-semibold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <div className="text-center text-gray-600">
              {activeTab === "views" && <p>Post view statistics will appear here</p>}
              {activeTab === "earnings" && <p>Your earnings details will appear here</p>}
              {activeTab === "followers" && <p>Your followers will appear here</p>}
              {activeTab === "likes" && <p>Posts that received likes will appear here</p>}
              {activeTab === "dislikes" && <p>Posts that received dislikes will appear here</p>}
              {activeTab === "following" && <p>Users you follow will appear here</p>}
              {activeTab === "posts" && <p>Your posts will appear here</p>}
              {activeTab === "comments" && <p>Comments on your posts will appear here</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSummaryDashboard;