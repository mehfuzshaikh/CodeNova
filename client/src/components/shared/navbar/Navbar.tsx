'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileAvatar from './ProfileAvatar';


export default function Navbar() {
  const { isAuthenticated } = useSelector((state:RootState)=>state.auth);
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & App Name */}
      <div className="flex items-center gap-2">
        {/* Replace this with an image if you have a logo */}
        <span className="text-xl font-bold text-blue-600">🚀 CodeChallenge</span>
      </div>

      {/* Center: Navigation */}
      {isAuthenticated && (
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/explore">Explore</Link>
          <Link href="/problems">Problems</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/about">About</Link>
        </div>
      )}
      

      {/* Right: Auth Buttons */}
      <div className="flex gap-3">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        ):(
          <ProfileAvatar />
        )}
        
      </div>
    </nav>
  );
}
