'use client';

import { use } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/lib/api/auth';
import { toast } from 'sonner';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';


const schema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    try {
      const res = await resetPassword(token, { password:data.password,confirmPassword:data.confirmPassword});
      toast.success(res.data.message);
      router.push('/auth/login');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Something went wrong';
      setError('confirmPassword', { type: 'manual', message: msg });
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-35">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Set New Password</h2>

        <div className='relative'>
          <LockIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('password')} type="password" placeholder="New Password" className='pl-9'/>
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div className='relative'>
          <ShieldCheckIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('confirmPassword')} type="password" placeholder="Confirm New Password" className='pl-9'/>
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full btn-ghost-custom" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}
