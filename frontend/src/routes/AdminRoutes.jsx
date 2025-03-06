import AuthRoute from "../components/AuthRoute/AuthRoute";
import AdminDashboard from "../components/Admin/AdminDashboard";



import {Routes, Route} from "react-router-dom";

import AccountSummaryDashboard from "../components/Admin/AccountSummary";
import CreatePost from "../components/Posts/CreatePost"
import DashboardPosts from "../components/Admin/DashboardPosts"
import UpdatePost from "../components/Posts/UpdatePost"
import UploadProfilePic from "../components/Admin/UploadProfilePic"
import Settings from "../components/Admin/SettingsPage"
import AddEmailComponent from "../components/Admin/UpdateEmail"
import MyFollowing from "../components/Admin/MyFollowing"
import MyFollowers from "../components/Admin/MyFollowers"
import MyEarnings from "../components/Admin/MyEarnings"
import Notifications from "../components/Notification/NotificationLists"
import AccountVerifiedComponent from "../components/Admin/AccountVerification"

import AddCategory from "../components/Category/AddCategory"
import PostsList from "../components/Posts/PostsList";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import ContentPart from "../components/Admin/Content-Management/ContentModeration";
import PaymentsDashboard from "../components/Admin/Payments/PaymentsDashboard";
import UserManagement from "../components/Admin/UserManagement/Usersmanagement";
import ManageData from "../components/Posts/Managedata";
import WebinarForm from "../components/Posts/WebinarForm";
import ResetPassword from "../components/Subscribers/ResetPassword";
import PlanDetails from "../components/Plans/PlanDetails";
import StepByStepGuide from "../components/Posts/StepByStepGuide";




const AdminRoutes = () => {
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <AuthRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </AuthRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="content-management" element={<ContentPart/>} />
          <Route path="user-management" element={<UserManagement/>} />
          <Route path="payment-management" element={<PaymentsDashboard/>} />
          <Route path="profile" element={<AccountSummaryDashboard />} />
          <Route path="create-post/article" element={<CreatePost />} />
          <Route path="create-post/webinar" element={<WebinarForm />} />
          <Route path="create-post/StepbyStepGuide" element={<StepByStepGuide />} />
          <Route path="create-post/webinar" element={<WebinarForm />} />
          <Route path="manage-content" element={<ManageData />} />
          <Route path="posts" element={<DashboardPosts />} />
          <Route path="update-post/:postId" element={<UpdatePost />} />
          <Route path="upload-profile-photo" element={<UploadProfilePic />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-email" element={<AddEmailComponent />} />
          <Route path="my-followings" element={<MyFollowing />} />
          <Route path="my-followers" element={<MyFollowers />} />
          <Route path="my-earnings" element={<MyEarnings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="latestposts" element={<PostsList />} />
         
          <Route path="plan-details" element={<PlanDetails />} />
          <Route path="add-category" element={<AddCategory />} />
         
        </Route>
        <Route
            path="account-verification/:verifyToken"
            element={<AccountVerifiedComponent />}
          />
           <Route path="reset-password/:verifyToken" element={<ResetPassword/>}/>
        <Route
            path="/account-verification/:verifyToken"
            element={<AccountVerifiedComponent />}
          />
      </Routes>
    );
  };
  
  export default AdminRoutes;