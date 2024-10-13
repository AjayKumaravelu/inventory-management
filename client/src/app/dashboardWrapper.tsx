"use client";

import React, { useEffect } from 'react';
import Navbar from "@/app/(components)/Navbar";
import Sidebar from '@/app/(components)/Sidebar';
import StoreProvider, { useAppSelector } from './redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { useDispatch } from 'react-redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed)); // Use dispatch
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode)); // Use dispatch
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Add isDarkMode to the dependency array

  return (
    <div
      className={`
        ${isDarkMode ? "dark" : "light"}
        flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
