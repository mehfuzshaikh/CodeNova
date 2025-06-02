'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { Button } from '../ui/button';
import { useState } from 'react';
import ImageUploadModal from './ImageUploadModal';
import DefaultAvatar from '../../../public/DefaultAvatar.png';

const ProfileHeader: React.FC = () => {
  // Access user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);
  const [ isModalOpen,setIsModalOpen ] = useState(false);
    
  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-15 shadow-lg">
      <div className="flex items-center gap-8">
        <div className='align-baseline ml-20'>
          <Image 
            src={user.profileImg || DefaultAvatar} 
            alt="Profile Picture" 
            width={120} 
            height={120} 
            className="rounded-full border-4 border-white"
          />
          <Button variant="link" className="text-blue-600 ml-7" onClick={()=>setIsModalOpen(true)}>Edit</Button>
        </div>
        <div className='mb-6'>
          <h2 className="text-2xl font-semibold">{user.name || 'User Name'}</h2>
          <p className="text-gray-300">Username: {user.username || 'username'}</p>
        </div>
      </div>
      <ImageUploadModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
    </div>
  );
};

export default ProfileHeader;
