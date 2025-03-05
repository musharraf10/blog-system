import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { Button } from "@mui/material";
import Checkposttypemodal from "../Posts/Checkposttypemodal";
import { useQuery } from "@tanstack/react-query";
import NotificationCounts from "../Notification/NotificationCounts";
import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const [showModal, setShowModal] = useState(false)
  const [contentType, setContentType] = useState("selectyourcontent")
  const navigate = useNavigate()

  // Mock data - replace with your actual implementation
  const data = mockUserData
  const userRole = data?.role

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value)
  }

  // Function to toggle the modal visibility
  const checkmodalopenclose = () => {
    setContentType("selectyourcontent")
    setShowModal(!showModal)
  }

  const logoutHandler = async () => {
    try {
      // Replace with your actual logout logic
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    userRole !== "admin" && { name: "Latest Posts", path: `/${userRole}/latestposts` },
    userRole !== "admin" && { name: "Creators Ranking", path: "/ranking" },
    userRole !== "admin" && { name: "Pricing", path: `/${userRole}/pricing` },
  ].filter(Boolean);

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center mr-6">
                  <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] p-2 rounded-lg">
                    <FaBlog className="h-6 w-auto text-white" />
                  </div>
                  {/* <span className="ml-2 text-xl font-semibold text-gray-800 hidden md:block">AdminPanel</span> */}
                </Link>

                <Disclosure.Button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>

                <div className="hidden md:flex md:space-x-6">
                  {navLinks.map(({ name, path }) => (
                    <Link
                      key={name}
                      to={path}
                      className="text-sm font-medium text-gray-700 hover:text-[#1565C0] transition-all duration-300"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to={`/${userRole}`}
                  className="bg-[#1565C0] text-white px-3 py-2 rounded-lg hover:bg-[#1565C0]/90 transition-all duration-300 flex items-center"
                >
                  <MdOutlineDashboard className="inline mr-1.5" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logoutHandler}
                  className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
                  title="Logout"
                >
                  <IoLogOutOutline className="h-5 w-5" />
                </button>

                {/* Notification placeholder - replace with your component */}
                <div className="relative">
                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all duration-300">
                    <span>0</span>
                  </div>
                </div>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex text-sm rounded-full focus:ring-2 focus:ring-[#1565C0]/50 transition-all duration-300">
                    {data.profilePicture !== null ? (
                      <img
                        className="h-10 w-10 rounded-full border-2 border-gray-200"
                        src={data.profilePicture.path || "/placeholder.svg"}
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
                              "block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1565C0]/10",
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
                              "block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1565C0]/10",
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
                              "block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1565C0]/10",
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  className="flex items-center bg-[#1565C0] text-white px-3 py-2 rounded-lg hover:bg-[#1565C0]/90 transition-all duration-300 shadow-sm"
                  onClick={checkmodalopenclose}
                >
                  <Plus className="w-5 h-5 mr-1.5" />
                  <span className="font-medium">New Content</span>
                </button>

                {/* Modal Component - replace with your actual component */}
                {showModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                      <h2 className="text-xl font-bold mb-4">Select Content Type</h2>
                      <select
                        value={contentType}
                        onChange={handleContentTypeChange}
                        className="w-full p-2 border rounded mb-4"
                      >
                        <option value="selectyourcontent">Select your content</option>
                        <option value="blog">Blog</option>
                        <option value="video">Video</option>
                      </select>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={checkmodalopenclose}
                          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-300"
                        >
                          Cancel
                        </button>
                        <button className="px-4 py-2 bg-[#1565C0] text-white rounded-md hover:bg-[#1565C0]/90 transition-all duration-300">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="block text-gray-700 hover:bg-[#1565C0]/10 p-2.5 rounded-md transition-all duration-300"
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
