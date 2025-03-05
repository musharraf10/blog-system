import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBlog, FaUserEdit, FaCalendarPlus, FaTags } from "react-icons/fa";
import { MdContentPaste, MdPayment } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import PrivateNavbar from "../Navbar/PrivateNavbar";

const navigation = [
  { name: "Feed", href: "/subscriber/feed", icon: HomeIcon },
  { name: "Trending", href: "/subscriber/trendingcontent", icon: MdContentPaste },
  { name: "Webinars", href: "/subscriber/webinars", icon: FaUsersCog },
  { name: "Shorts", href: "/subscriber/shorts", icon: MdPayment },
  { name: "Video Tutorials", href: "/subscriber/stepbystepguide", icon: FaUserEdit },
  { name: "Bookmarks", href: "/subscriber/bookmarks", icon: FaCalendarPlus },
  { name: "Upcoming Events", href: "/subscriber/upcomingevents", icon: FaTags },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <PrivateNavbar />
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-64 flex-col bg-white p-4 shadow-lg h-full">
                <button className="absolute top-4 right-4 text-gray-700" onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <Link to="/" className="mb-6 flex items-center justify-center">
                  <FaBlog className="h-8 w-auto text-orange-500" />
                </Link>
                <nav className="space-y-2 flex-1">
                  {navigation.map(({ name, href, icon: Icon }) => (
                    <Link key={name} to={href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      <Icon className="h-6 w-6 mr-3 text-gray-500" /> {name}
                    </Link>
                  ))}
                </nav>
                <Link to="/subscriber/settings" className="mt-auto flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Cog6ToothIcon className="h-6 w-6 mr-3 text-gray-500" /> Settings
                </Link>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex min-h-screen">
        {/* Sidebar for desktop - Sticky and does not scroll */}
        <aside className="hidden lg:flex w-72 flex-col bg-white p-4 border-r border-gray-200 shadow-md fixed top-15 left-0 h-[100vh]">
          <Link to="/subscriber" className="mb-6 flex items-center justify-center">
            <FaBlog className="h-8 w-auto text-orange-500" />
          </Link>
          <nav className="space-y-2 flex-1">
            {navigation.map(({ name, href, icon: Icon }) => (
              <Link key={name} to={href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Icon className="h-6 w-6 mr-3 text-gray-500" /> {name}
              </Link>
            ))}
          </nav>
          <Link to="/subscriber/settings" className="mt-auto flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Cog6ToothIcon className="h-6 w-6 mr-3 text-gray-500" /> Settings
          </Link>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-6 lg:ml-72">
          <button className="lg:hidden mb-4 text-orange-500" onClick={() => setSidebarOpen(true)}>
            ☰ Open Sidebar
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
}
