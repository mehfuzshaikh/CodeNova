'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { Button } from '../ui/button';
import { useState } from 'react';
import ImageUploadModal from './ImageUploadModal';
import DefaultAvatar from '../../../public/DefaultAvatar.png';
import { FaEdit } from 'react-icons/fa';

const ProfileHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-blue-950 to-[#0c0f1a] text-white shadow-lg h-70">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-5">
          <div className="flex flex-col items-center sm:items-start pl-20 pt-10">
            <Image
              src={user.profileImg || DefaultAvatar}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white object-cover"
            />
            <Button
              variant="link"
              className="text-blue-400 mt-1 ml-5"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit/> Edit
            </Button>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold break-words">{user.name || "Name"}</h2>
            <p className="text-gray-300 break-all">
              Username: {user.username || 'username'}
            </p>
          </div>
        </div>
      </div>

      <ImageUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfileHeader;
