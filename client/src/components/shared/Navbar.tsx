'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout as logoutApi } from '@/lib/api/auth';
import { logout } from '@/redux/features/auth/authSlice';
import { toast } from 'sonner';
import router from 'next/router';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state:RootState)=>state.auth);

  const handleLogout = async()=>{
    try {
      const res = await logoutApi();
      dispatch(logout());
      toast.success(res.data.message || "Logged out");
      router.push('/');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(msg);
    }
  }
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
          <Link href="/challenges">Challenges</Link>
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
          <Button onClick={handleLogout}>Logout</Button>
        )}
        
      </div>
    </nav>
  );
}
