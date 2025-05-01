'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & App Name */}
      <div className="flex items-center gap-2">
        {/* Replace this with an image if you have a logo */}
        <span className="text-xl font-bold text-blue-600">🚀 CodeChallenge</span>
      </div>

      {/* Center: Navigation */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/challenges">Challenges</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/about">About</Link>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex gap-3">
        <Link href="/auth/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/auth/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}
