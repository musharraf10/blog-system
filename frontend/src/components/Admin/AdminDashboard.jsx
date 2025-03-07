"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { FaBlog, FaUserEdit, FaCalendarPlus, FaTags } from "react-icons/fa"
import { MdContentPaste, MdPayment } from "react-icons/md"
import { FaUsersCog } from "react-icons/fa"
import { Link, Outlet, useLocation } from "react-router-dom"
import PrivateNavbar from "../Navbar/PrivateNavbar"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Content Management", href: "/admin/content-management", icon: MdContentPaste },
  { name: "User Management", href: "/admin/user-management", icon: FaUsersCog },
  { name: "Payment Management", href: "/admin/payment-management", icon: MdPayment },
  { name: "Manage Content", href: "/admin/manage-content", icon: FaUserEdit },
  { name: "Plan Details", href: "/admin/plan-details", icon: FaCalendarPlus },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <PrivateNavbar />
      </div>

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
              <Dialog.Panel className="relative flex w-80 flex-col bg-gradient-to-b from-white to-blue-50 p-5 h-screen shadow-xl">
                <button
                  className="absolute top-4 right-4 bg-white/80 rounded-full p-1.5 transition-all duration-300 hover:bg-white shadow-sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
                <Link to="/" className="mb-8 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] p-2.5 rounded-lg shadow-md">
                    <FaBlog className="h-6 w-auto text-white" />
                  </div>
                  <span className="ml-3 text-xl font-semibold text-gray-800">AdminPanel</span>
                </Link>
                <nav className="space-y-1.5">
                  {navigation.map(({ name, href, icon: Icon }) => {
                    // Only apply active styling if it's not the Dashboard and the path matches
                    const isActive =
                      href !== "/admin" && (location.pathname === href || location.pathname.startsWith(href + "/"))

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
                        <Icon
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${isActive ? "text-[#1565C0]" : "text-gray-500"}`}
                        />
                        <span className="truncate">{name}</span>
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-auto mb-6">
                  <Link
                    to="/admin/settings"
                    className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
                      location.pathname === "/admin/settings"
                        ? "bg-gradient-to-r from-[#1565C0]/10 to-[#42A5F5]/20 text-[#1565C0] font-medium border-l-4 border-[#1565C0] shadow-sm"
                        : "text-gray-700 hover:bg-white/90 hover:shadow-sm"
                    }`}
                  >
                    <Cog6ToothIcon
                      className={`h-5 w-5 mr-3 flex-shrink-0 ${
                        location.pathname === "/admin/settings" ? "text-[#1565C0]" : "text-gray-500"
                      }`}
                    />
                    <span className="truncate">Settings</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex">
        <aside className="hidden lg:flex w-80 flex-col bg-gradient-to-b from-white to-blue-50 p-5 h-screen fixed top-16 shadow-md border-r border-blue-100">
          <Link to="/" className="mb-8 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#1565C0] to-[#42A5F5] p-2.5 rounded-lg shadow-md">
              <FaBlog className="h-6 w-auto text-white" />
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-800">AdminPanel</span>
          </Link>
          <nav className="space-y-1.5">
            {navigation.map(({ name, href, icon: Icon }) => {
              // Only apply active styling if it's not the Dashboard and the path matches
              const isActive =
                href !== "/admin" && (location.pathname === href || location.pathname.startsWith(href + "/"))

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
                  <span className="truncate">{name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto mb-[30%]">
            <Link to="/admin/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Cog6ToothIcon className="h-6 w-6 mr-3 text-gray-500" /> Settings
            </Link>
          </div>
        </aside>

        <div className="flex-1 p-8 mt-16 lg:ml-80 bg-gray-50 min-h-screen">
          <button
            className="lg:hidden mb-6 flex items-center px-4 py-2.5 bg-gradient-to-r from-[#1565C0] to-[#42A5F5] text-white rounded-lg shadow-md transition-all duration-300 hover:opacity-90"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="mr-2">☰</span> Menu
          </button>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
