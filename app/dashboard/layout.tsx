"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useCallback } from "react";
import { Package2, LayoutDashboard, Receipt, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <div
        className={`bg-white dark:bg-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 px-4"
          onClick={closeSidebar}
        >
          <Package2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Spendly</span>
        </Link>

        <nav>
          <Link
            href="/dashboard"
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary ${
              pathname === "/dashboard"
                ? "bg-gray-200 dark:bg-gray-700 text-primary"
                : ""
            }`}
            onClick={closeSidebar}
          >
            <LayoutDashboard className="inline-block w-6 h-6 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/transactions"
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary ${
              pathname === "/dashboard/transactions"
                ? "bg-gray-200 dark:bg-gray-700 text-primary"
                : ""
            }`}
            onClick={closeSidebar}
          >
            <Receipt className="inline-block w-6 h-6 mr-2" />
            Transactions
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="ml-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>

      {/* Overlay to close sidebar on mobile when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}
