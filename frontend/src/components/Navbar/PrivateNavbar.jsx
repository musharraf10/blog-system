import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  logoutAPI,
  checkAuthStatusAPI,
} from "../../APIServices/users/usersAPI";
import { logout } from "../../redux/slices/authSlices";
import NotificationCounts from "../Notification/NotificationCounts";
import AuthCheckingComponent from "../Templates/AuthCheckingComponent";
import { Button } from "@mui/material";
import { Plus, PlusCircle } from "lucide-react";
import Checkposttypemodal from "../Posts/Checkposttypemodal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const [showModal, setShowModal] = useState(false);

  const [contentType, setContentType] = useState("selectyourcontent"); // Initialize with the default value


  const handleContentTypeChange = (event) => {
    setContentType(event.target.value); // Update the state when selection changes
  };


  // Function to toggle the modal visibility
  const checkmodalopenclose = () => {
    setContentType("selectyourcontent");
    setShowModal(!showModal);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutAPI,
  });

  if (isLoading) return <AuthCheckingComponent />;
  let userRole = data?.role;

  const logoutHandler = async () => {
    try {
      await logoutMutation.mutateAsync();
      // await logoutMutation.invalidateQueries(["user-auth"]);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { name: "Latest Posts", path: `/${userRole}/latestposts` },
    { name: "Creators Ranking", path: "/ranking" },
    userRole !== "admin" && { name: "Pricing", path: `/${userRole}/pricing` },
  ].filter(Boolean);

  return (
    <Disclosure
      as="nav"
      className="bg-white sticky top-0 z-50 border-b border-gray-300 shadowmd"
    >
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <Disclosure.Button className="md:hidden p-2 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500">
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>

              <div className="hidden md:flex md:space-x-8">
                {navLinks.map(({ name, path }) => (
                  <Link
                    key={name}
                    to={path}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-10 mr-10">
                <Link
                  to={`/${userRole}`}
                  className="bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500"
                >
                  <MdOutlineDashboard className="inline mr-1" /> Dashboard
                </Link>
                <button
                  onClick={logoutHandler}
                  className="bg-red-600 text-white p-2 rounded-md hover:bg-indigo-500"
                >
                  <IoLogOutOutline className="h-5 w-5" />
                </button>
                <NotificationCounts />

                <Menu as="div" className="relative">
                  <Menu.Button className="flex text-sm rounded-full focus:ring-2 focus:ring-indigo-500">
                    {data.profilePicture !== null ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={data.profilePicture.path}
                        alt="Profile"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">U</span>
                      </div>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${userRole}/profile`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${userRole}/settings`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Button
                  className="flex items-center  p-2 space-x-2 transition duration-200"
                  sx={{
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "1px solid #007bff",
                      color: "black",

                    },
                  }}
                  onClick={checkmodalopenclose}
                >
                  <Plus
                    sx={{
                      "&:hover": {
                        color: "black", // Change icon color to black on hover
                      },
                    }}
                    className="w-6 h-6 "
                  />
                  <span>New Content</span>
                </Button>




                {/* Modal Component */}
                <Checkposttypemodal
                  onHide={checkmodalopenclose}
                  show={showModal}
                  contentType={contentType}
                  handleContentTypeChange={handleContentTypeChange}
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="block text-gray-700 hover:bg-gray-100 p-2 rounded-md"
              >
                {name}
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
