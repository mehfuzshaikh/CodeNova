"use client";  // Mark this as a client component

import Navbar from './navbar/Navbar';
import AdminNavbar from './adminNavbar/AdminNavbar';
import { usePathname } from 'next/navigation';

const DynamicNavbar = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Conditionally render the navbar
  return isAdminRoute ? <AdminNavbar /> : <Navbar />;
};

export default DynamicNavbar;
