import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBlog, FaUserEdit, FaCalendarPlus, FaTags } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

import {
  FaUserEdit,
  FaFileAlt,
  FaUsers,
  FaCalendarPlus,
  FaTags,
  FaWallet,
} from "react-icons/fa";

const navigation = [
  { name: "Dashboard", href: "/curator", icon: HomeIcon },
  { name: "Content Editor", href: "/curator/editor", icon: MdContentPaste },
  { name: "Create Post", href: "/curator/create-post", icon: FaUserEdit },
  { name: "ContentDashBoard", href: "/curator/ContentDashBoard", icon: MdContentPaste },
  { name: "Schedule Post", href: "/curator/schedule-post", icon: FaCalendarPlus },
  { name: "Manage Categories", href: "/curator/manage-categories", icon: FaTags },
];

export default function CuratorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Account summary component */}

      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* Logo */}
                      <Link to="/">
                        <FaBlog className="h-8 w-auto text-orange-500" />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-orange-600"
                                      : "text-orange-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-orange-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-orange-600"
                                : "text-gray-400 group-hover:text-orange-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <Link
                    to="/dashboard/settings"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Your content */}

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
