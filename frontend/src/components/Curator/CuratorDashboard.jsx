import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaBlog, FaUserEdit, FaTags } from "react-icons/fa";
import { MdContentPaste, MdDashboard } from "react-icons/md";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import PrivateNavbar from "../Navbar/PrivateNavbar";

const navigation = [
  { name: "Dashboard", href: "/curator/ContentDashBoard", icon: MdDashboard },
  { name: "Create Post", href: "/curator/create-post", icon: FaUserEdit },
  { name: "Content Dashboard", href: "/curator/DashBoard", icon: MdContentPaste },
  
  { name: "Manage Categories", href: "/curator/AddCategory", icon: FaTags }
];

export default function CuratorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
              <Dialog.Panel className="relative flex w-72 flex-col bg-white p-5 h-screen shadow-xl">
                <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
                <Link to="/curator" className="mb-8 flex items-center">
                  <FaBlog className="h-6 w-auto text-blue-500" />
                  <span className="ml-3 text-xl font-semibold text-gray-800">Curator Panel</span>
                </Link>
                <nav className="space-y-1.5">
                  {navigation.map(({ name, href, icon: Icon }) => {
                    const isActive = location.pathname === href || location.pathname.startsWith(href + "/");
                    return (
                      <Link
                        key={name}
                        to={href}
                        className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
                          isActive
                            ? "bg-gradient-to-r from-[#1565C0]/10 to-[#42A5F5]/20 text-[#1565C0] font-medium border-l-4 border-[#1565C0] shadow-sm"
                            : "text-gray-700 hover:bg-white/90 hover:shadow-sm"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${isActive ? "text-[#1565C0]" : "text-gray-500"}`} />
                        <span className="ml-3">{name}</span> {/* Removed truncate */}
                      </Link>
                    );
                  })}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex">
        <aside className="hidden lg:flex w-72 flex-col bg-white p-5 h-screen fixed top-16 shadow-md border-r border-blue-100">
          <Link to="/curator" className="mb-8 flex items-center">
            <FaBlog className="h-6 w-auto text-blue-500" />
            <span className="ml-3 text-xl font-semibold text-gray-800">Curator Panel</span>
          </Link>
          <nav className="space-y-1.5">
            {navigation.map(({ name, href, icon: Icon }) => {
              const isActive = location.pathname === href || location.pathname.startsWith(href + "/");
              return (
                <Link
                  key={name}
                  to={href}
                  className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-[#1565C0]/10 to-[#42A5F5]/20 text-[#1565C0] font-medium border-l-4 border-[#1565C0] shadow-sm"
                      : "text-gray-700 hover:bg-white/90 hover:shadow-sm"
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${isActive ? "text-[#1565C0]" : "text-gray-500"}`} />
                  <span className="ml-3">{name}</span> {/* Removed truncate */}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 p-8 mt-16 lg:ml-72 bg-gray-50 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}
