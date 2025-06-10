'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileAvatar from './ProfileAvatar';
import Image from 'next/image';
import LOGO from '../../../../public/logo.png';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Learn', href: '/learn' },
    { label: 'Problems', href: '/problems' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & App Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={LOGO} alt="CodeNova Logo" width={50} height={50} />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-gray-700 text-transparent bg-clip-text">
          CodeNova
        </span>
      </Link>

      {/* Center: Navigation */}
      {isAuthenticated && (
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-500 font-bold'
                    : 'hover:text-black'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Right: Auth Buttons */}
      <div className="flex gap-3">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md transition-all duration-300 
               hover:bg-blue-50 hover:border-blue-500 
               hover:shadow-[0_0_6px_2px_rgba(96,165,250,0.4)]"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-ghost-custom">Sign Up</Button>
            </Link>
          </>
        ) : (
          <ProfileAvatar />
        )}
      </div>
    </nav>
  );
}

