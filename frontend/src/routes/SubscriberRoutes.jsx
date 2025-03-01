import AuthRoute from "../components/AuthRoute/AuthRoute";
import SubscriberDashboard from "../components/Subscribers/SubscriberDashboard";
import { Routes, Route} from "react-router-dom";

import AccountSummaryDashboard from "../components/Subscribers/AccountSummary";
import DashboardPosts from "../components/Subscribers/DashboardPosts"
import UploadProfilePic from "../components/Subscribers/UploadProfilePic"
import Settings from "../components/Subscribers/Settings/Settings"
import AddEmailComponent from "../components/Subscribers/UpdateEmail"
import MyFollowing from "../components/Subscribers/MyFollowing"
import MyFollowers from "../components/Subscribers/MyFollowers"
import Notifications from "../components/Notification/NotificationLists"
import AccountVerifiedComponent from "../components/Subscribers/AccountVerification"

import PostsList from "../components/Posts/PostsList";
import Pricing from "../components/Plans/Pricing";
// import Profile from "../components/Subscribers/Settings/Profile";
import Plan from "../components/Subscribers/Settings/Plan";
import Billing from "../components/Subscribers/Settings/Billing";
import ChangePassword from "../components/Subscribers/Settings/ChangePassword";
import BecomeCreator from "../components/Subscribers/Settings/BecomeCreator";
import { SettingsPhone } from "@mui/icons-material";
import SettingsSubPage from "../components/Subscribers/SettingsPage";
import SearchFilter from "../components/Subscribers/Webinars/SearchFilter";
import PayingFreePlan from "../components/Plans/PayingFreePlan";
import Trending from "../components/Subscribers/Trending/Trending";
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
          <Route path="feed" element={<PostsList />} />
          <Route path="upload-profile-photo" element={<UploadProfilePic />} />
          <Route path="settings" element={<Settings />}>
          <Route index path="profilesettings" element={<SettingsSubPage/>} /> 
          <Route path="plan" element={<Plan />} />
          {/* <Route path="webinars" element={<SearchFilter />} /> */}
          <Route path="trendingcontent" element={<Trending />} />
          <Route path="billing" element={<Billing />} />
          <Route path="security" element={<ChangePassword />} />
          <Route path="become-creator" element={<BecomeCreator />} />
          </Route>
          <Route path="profile" element={<AccountSummaryDashboard />} />
          <Route path="my-followings" element={<MyFollowing />} />
          <Route path="my-followers" element={<MyFollowers />} />
          <Route path="add-email" element={<AddEmailComponent />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="latestposts" element={<DashboardPosts/>} />
          <Route path="pricing" element={<Pricing/>} />
          <Route path="free-subscription" element={<PayingFreePlan/>} />

          <Route
            path="account-verification/:verifyToken"
            element={<AccountVerifiedComponent />}
          />
          
        </Route>
      </Routes>
    );
  };
  
  export default SubscriberRoutes;