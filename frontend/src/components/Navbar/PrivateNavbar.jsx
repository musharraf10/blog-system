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
  const [showModal, setShowModal] = useState(false);
  const [contentType, setContentType] = useState("selectyourcontent");
  const navigate = useNavigate();


  
const { isLoading, data,  } = useQuery({
  queryKey: ["user-auth"],
  queryFn: checkAuthStatusAPI,
  refetchOnWindowFocus: true, 
});

  const userRole = data?.role;

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  };

  const checkmodalopenclose = () => {
    setContentType("selectyourcontent");
    setShowModal(!showModal);
  };

  const logoutHandler = async () => {
    try {
      navigate("/login");
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
    <Disclosure as="nav" className="bg-white sticky top-0 z-0  border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
               

                <Disclosure.Button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-300">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>

                <div className="hidden md:flex md:space-x-6">
                  {navLinks.map(({ name, path }) => (
                    <Link key={name} to={path} className="text-sm font-medium text-gray-700 hover:text-[#1565C0] transition-all duration-300">
                      {name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* <Link to={`/${userRole}`} className="bg-[#1565C0] text-white px-3 py-2 rounded-lg hover:bg-[#1565C0]/90 transition-all duration-300 flex items-center">
                  <MdOutlineDashboard className="inline mr-1.5" />
                  <span>Dashboard</span>
                </Link> */}

                <button onClick={logoutHandler} className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-all duration-300" title="Logout">
                  <IoLogOutOutline className="h-5 w-5" />
                </button>

                <NotificationCounts props={userRole}/>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex text-sm rounded-full focus:ring-2 focus:ring-[#1565C0]/50 transition-all duration-300">
                    {data.profilePicture ? (
                      <img className="h-10 w-10 rounded-full border-2 border-gray-200" src={data.profilePicture.path} alt="Profile" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                        <span className="text-gray-600 font-medium">U</span>
                      </div>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to={`/${userRole}/profile`} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1565C0]/10")}>
                            My Profile
                          </Link>
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
                <Checkposttypemodal onHide={checkmodalopenclose} show={showModal} contentType={contentType} handleContentTypeChange={handleContentTypeChange} />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
