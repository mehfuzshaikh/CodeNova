'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutApi } from '@/lib/api/admin/auth';
import { adminLogout } from '@/redux/features/admin/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';

type Props = {
  children: React.ReactNode;
};

export default function ProfileMenu({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { admin } = useSelector((state: RootState) => state.adminAuth);

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      dispatch(adminLogout());
      toast.success(res.data.message || 'Logged out');
      router.push('/admin');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(msg);
    }
  };

  if (!admin) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <div className="flex items-center space-x-3 px-3 py-2 border-b">
          <Avatar className="h-10 w-10">
            <AvatarImage
              alt="Profile"
            />
            <AvatarFallback>{admin.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{admin.username}</p>
            {/* <p className="text-xs text-muted-foreground">{user.email}</p> */}
          </div>
        </div>

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
