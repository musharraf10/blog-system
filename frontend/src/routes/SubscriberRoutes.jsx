import AuthRoute from "../components/AuthRoute/AuthRoute";
import SubscriberDashboard from "../components/Subscribers/SubscriberDashboard";



import { Routes, Route} from "react-router-dom";


import AccountSummaryDashboard from "../components/Subscribers/AccountSummary";
import CreatePost from "../components/Posts/CreatePost"
import DashboardPosts from "../components/Subscribers/DashboardPosts"
import UpdatePost from "../components/Posts/UpdatePost"
import UploadProfilePic from "../components/Subscribers/UploadProfilePic"
import Settings from "../components/Subscribers/SettingsPage"
import AddEmailComponent from "../components/Subscribers/UpdateEmail"
import MyFollowing from "../components/Subscribers/MyFollowing"
import MyFollowers from "../components/Subscribers/MyFollowers"
import MyEarnings from "../components/Subscribers/MyEarnings"
import Notifications from "../components/Notification/NotificationLists"
import AccountVerifiedComponent from "../components/Subscribers/AccountVerification"
import CreatePlan from "../components/Plans/CreatePlan"
import AddCategory from "../components/Category/AddCategory"
import PostsList from "../components/Posts/PostsList";
import Pricing from "../components/Plans/Pricing";



const SubscriberRoutes = () => {
    return (
      <Routes>
        <Route
          path="/subscriber"
          element={
            <AuthRoute allowedRoles={["subscriber"]}>
              <SubscriberDashboard />
            </AuthRoute>
          }
        >
          <Route path="posts" element={<DashboardPosts />} />
          <Route path="upload-profile-photo" element={<UploadProfilePic />} />
          <Route path="settings" element={<Settings />} />
          <Route path="my-followings" element={<MyFollowing />} />
          <Route path="my-followers" element={<MyFollowers />} />
          <Route path="add-email" element={<AddEmailComponent />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="latestposts" element={<PostsList/>} />
          <Route path="pricing" element={<Pricing/>} />
          <Route
            path="account-verification/:verifyToken"
            element={<AccountVerifiedComponent />}
          />
        </Route>
      </Routes>
    );
  };
  
  export default SubscriberRoutes;