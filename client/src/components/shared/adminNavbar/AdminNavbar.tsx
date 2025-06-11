'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileAvatar from './ProfileAvatar';
import Image from 'next/image';
import LOGO from '../../../../public/logo.png';

export default function AdminNavbar() {
  const { isAdminAuthenticated } = useSelector((state: RootState) => state.adminAuth);
  const pathname = usePathname();

  const adminLinks = [
    { label: 'Home', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Challenges', href: '/admin/challenges' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between relative">
      {/* Left: Logo & Name */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Image src={LOGO} alt="CodeNova Logo" width={50} height={50} />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-gray-700 text-transparent bg-clip-text">
            CodeNova
          </span>
        </div>
      </div>

      {/* Center: Navigation */}
      {isAdminAuthenticated && (
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-6 text-sm font-medium text-gray-700">
          {adminLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-blue-500 font-bold' : 'hover:text-black'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Right: Auth/Profile */}
      <div className="flex-1 flex justify-end gap-3">
        {!isAdminAuthenticated ? (
          // <Link href="/admin/login">
          //   <Button
          //     variant="ghost"
          //     className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md transition-all duration-300 
          //     hover:bg-blue-50 hover:border-blue-500 
          //     hover:shadow-[0_0_6px_2px_rgba(96,165,250,0.4)]"
          //   >
          //     Login
          //   </Button>
          // </Link>
          null
        ) : (
          <ProfileAvatar />
        )}
      </div>
    </nav>
  );
}
