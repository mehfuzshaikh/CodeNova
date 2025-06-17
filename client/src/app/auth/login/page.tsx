"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { login } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/features/auth/authSlice';
import Link from 'next/link';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [commonError, setCommonError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setCommonError(null);
    try {
      const res = await login(data);
      toast.success(res.data.message || 'Login successful');
      dispatch(setCredentials(res.data.data))
      router.push('/learn');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Login failed';
      setCommonError(msg);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-23">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-h-[400px] space-y-8 rounded-xl bg-white p-10 shadow-md mt-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In to your account</h2>

        <div className='relative space-y-1'>
          <MailIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('email')} type="email" placeholder="Email" className='pl-9'/>
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <LockIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className='pl-9'
          />
          {commonError && (
            <p className="text-sm text-red-600 mt-1">{commonError}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full btn-ghost-custom" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>

        <div>
          <p className="text-center text-sm text-gray-600 pb-2">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Admin?{' '}
            <Link href="/admin" className="font-medium text-blue-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
