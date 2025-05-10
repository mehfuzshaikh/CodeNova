'use client';

import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/redux/store';
import ProfileMenu from './ProfileMenu';

export default function ProfileAvatar() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <ProfileMenu>
      <Avatar className="h-9 w-9 cursor-pointer">
        <AvatarImage
          src={user.profileImg}
          alt="Profile"
        />
        <AvatarFallback>{user.username?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    </ProfileMenu>
  );
}
