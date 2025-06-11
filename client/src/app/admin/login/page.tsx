"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon} from 'lucide-react';
import { login } from '@/lib/api/admin/auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '@/redux/features/admin/authSlice';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

type AdminLoginFormData = yup.InferType<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [commonError, setCommonError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setCommonError(null);
    try {
      const res = await login(data);
      toast.success(res.data.message || 'Login successful');
      dispatch(setAdminCredentials(res.data.data))
      router.push('/admin');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Login failed';
      setCommonError(msg);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-h-[320px] space-y-8 rounded-xl bg-white p-10 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <div className='relative'>
          <UserIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('username')} placeholder="Username" className='pl-9'/>
          {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
        </div>

        <div className="relative">
          <LockIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className='pl-9'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {commonError && (
            <p className="text-sm text-red-600 mt-1">{commonError}</p>
          )}

        <Button type="submit" className="w-full btn-ghost-custom" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
