import AuthRoute from "../components/AuthRoute/AuthRoute";
import Home from "../components/Home/Home";
import Login from "../components/Subscribers/Login";
import Unauthorized from "../components/Templates/Unauthorized";
import PostDetails from "../components/Posts/PostDetails"

import {Routes, Route} from "react-router-dom";



import Register from "../components/Subscribers/Register";

import RequestResetPassword from "../components/Subscribers/RequestResetPassword"

import Rankings from "../components/Subscribers/CreatorsRanking"



export default function PublicRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<RequestResetPassword />} path="/forgot-password" />
        <Route element={<Rankings />} path="/ranking" />
        <Route path="posts/:postId" element={<AuthRoute allowedRoles={["curator","subscriber","admin"]}> <PostDetails /></AuthRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  )
}
