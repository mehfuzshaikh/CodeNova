'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';

const ProfileHeader: React.FC = () => {
  // Access user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);
    
  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-b-lg shadow-lg">
      <div className="flex items-center gap-6">
        <Image 
          src={user.profileImage || '/default-avatar.png'} 
          alt="Profile Picture" 
          width={120} 
          height={120} 
          className="rounded-full border-4 border-white"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name || 'User Name'}</h2>
          <p className="text-gray-300">Username: {user.username || 'username'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
