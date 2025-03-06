import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBlog, FaUserEdit, FaCalendarPlus, FaTags } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import PrivateNavbar from "../Navbar/PrivateNavbar";
// import DashBoard from "./contentEditor/DashBoard";
// import Analytics from "./contentEditor/Analytics";
import AddCategory from "../Category/AddCategory";

const navigation = [
  { name: "Dashboard", href: "/curator", icon: HomeIcon },
  // { name: "Content Editor", href: "/curator/editor", icon: MdContentPaste },
  { name: "Create Post", href: "/curator/create-post", icon: FaUserEdit },
  { name: "ContentDashBoard", href: "/curator/DashBoard", icon: MdContentPaste },
  // { name: "Analytics", href: "/curator/Analytics", icon: MdContentPaste },
  // { name: "Schedule Post", href: "/curator/schedule-post", icon: FaCalendarPlus },
  { name: "Manage Categories", href: "/curator/AddCategory", icon: FaTags }
];

export default function CuratorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <PrivateNavbar />
      {/* Mobile Sidebar */}
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
              <Dialog.Panel className="relative flex w-64 flex-col bg-white p-4">
                <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
                <Link to="/" className="mb-6 flex items-center justify-center">
                  <FaBlog className="h-8 w-auto text-orange-500" />
                </Link>
                <nav>
                  {navigation.map(({ name, href, icon: Icon }) => (
                    <Link key={name} to={href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      <Icon className="h-6 w-6 mr-3 text-gray-500" /> {name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col bg-white p-4 border-r border-gray-200">
          <Link to="/" className="mb-6 flex items-center justify-center">
            <FaBlog className="h-8 w-auto text-orange-500" />
          </Link>
          <nav>
            {navigation.map(({ name, href, icon: Icon }) => (
              <Link key={name} to={href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Icon className="h-6 w-6 mr-3 text-gray-500" /> {name}
              </Link>
            ))}
          </nav>
          <Link to="/curator/settings" className="mt-auto flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Cog6ToothIcon className="h-6 w-6 mr-3 text-gray-500" /> Settings
          </Link>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <button className="lg:hidden mb-4" onClick={() => setSidebarOpen(true)}>
            <span className="text-orange-500">☰ Open Sidebar</span>
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
}
