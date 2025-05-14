'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileAvatar from './ProfileAvatar';


export default function AdminNavbar() {
  const { isAdminAuthenticated } = useSelector((state:RootState)=>state.adminAuth);
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & App Name */}
      <div className="flex items-center gap-2">
        {/* Replace this with an image if you have a logo */}
        <span className="text-xl font-bold text-blue-600">🚀 CodeChallenge Admin side</span>
      </div>

      {/* Center: Navigation */}
      {isAdminAuthenticated && (
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/explore">Users</Link>
          <Link href="/admin/challenges">Challenges</Link>
          <Link href="/about">About</Link>
        </div>
      )}
      

      {/* Right: Auth Buttons */}
      <div className="flex gap-3">
        {!isAdminAuthenticated ? (
          <>
            <Link href="/admin/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </>
        ):(
          <ProfileAvatar />
        )}
        
      </div>
    </nav>
  );
}
