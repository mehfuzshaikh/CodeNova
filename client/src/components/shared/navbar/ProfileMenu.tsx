'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutApi } from '@/lib/api/auth';
import { logout } from '@/redux/features/auth/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';

type Props = {
  children: React.ReactNode;
};

export default function ProfileMenu({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      dispatch(logout());
      toast.success(res.data.message || 'Logged out');
      router.push('/');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(msg);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <div className="flex items-center space-x-3 px-3 py-2 border-b cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user.profileImg}
              alt="Profile"
            />
            <AvatarFallback>{user.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.username}</p>
            {/* <p className="text-xs text-muted-foreground">{user.email}</p> */}
          </div>
        </div>

        <DropdownMenuItem onClick={() => router.push('/edit-profile')} className='cursor-pointer'>
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/change-password')} className='cursor-pointer'>
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/account')} className='cursor-pointer'>
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
