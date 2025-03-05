import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/notifications";

//!fetch all notifications
export const fetchNotificationsAPI = async (postData) => {
  const response = await axios.get(`${BASE_URL}`, {
    withCredentials: include,
  });
  return response.data;
};

//! Read notification
export const readNotificationAPI = async (notificationId) => {
  const posts = await axios.patch(`${BASE_URL}/${notificationId}`, {},{
    withCredentials: true
  });
  return posts.data;
};
