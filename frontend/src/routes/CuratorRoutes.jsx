import AuthRoute from "../components/AuthRoute/AuthRoute";
import CuratorDashboard from "../components/Curator/CuratorDashboard";

import {Routes, Route} from "react-router-dom";

import AccountSummaryDashboard from "../components/Curator/AccountSummary";
import CreatePost from "../components/Posts/CreatePost"
import DashboardPosts from "../components/Curator/DashboardPosts"
import UpdatePost from "../components/Posts/UpdatePost"
import UploadProfilePic from "../components/Curator/UploadProfilePic"
import Settings from "../components/Curator/SettingsPage"
import AddEmailComponent from "../components/Curator/UpdateEmail"
import MyFollowing from "../components/Curator/MyFollowing"
import MyFollowers from "../components/Curator/MyFollowers"
import MyEarnings from "../components/Curator/MyEarnings"
import Notifications from "../components/Notification/NotificationLists"
import AccountVerifiedComponent from "../components/Curator/AccountVerification"
import AddCategory from "../components/Category/AddCategory"
import ContentEditor from "../components/Curator/contentEditor/ContentEditor"
import ContentDashBoard from "../components/Curator/ContentDashBoard";
import DashBoard from "../components/Curator/contentEditor/DashBoard";
import Analytics from "../components/Curator/contentEditor/Analytics";
import ResetPassword from "../components/Subscribers/ResetPassword";
import WebinarForm from "../components/Posts/WebinarForm";



const CuratorRoutes = () => {
    return (
      <Routes>
        <Route
          path="/curator"
          element={
            <AuthRoute allowedRoles={["curator"]}>
              <CuratorDashboard />
            </AuthRoute>
          }
        >
          <Route path="editor" element={<ContentEditor />} />
          <Route path="contentdashBoard" element={<ContentDashBoard />} />
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Analytics" element={<Analytics />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="profile" element={<AccountSummaryDashboard />} />
          <Route path="create-post/article" element={<CreatePost />} />
          <Route path="create-post/webinar" element={<WebinarForm />} />
      
          <Route path="posts" element={<DashboardPosts />} />
          <Route path="update-post/:postId" element={<UpdatePost />} />
          <Route path="upload-profile-photo" element={<UploadProfilePic />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-email" element={<AddEmailComponent />} />
          <Route path="my-followings" element={<MyFollowing />} />
          <Route path="my-followers" element={<MyFollowers />} />
          <Route path="my-earnings" element={<MyEarnings />} />
          <Route path="notifications" element={<Notifications />} />

          <Route
            path="account-verification/:verifyToken"
            element={<AccountVerifiedComponent />}
          />
          <Route path="add-category" element={<AddCategory />} />
        </Route>
        <Route path="reset-password/:verifyToken" element={<ResetPassword/>}/>
      </Routes>
    );
  };
  
  export default CuratorRoutes;