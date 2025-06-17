'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserIcon, MailIcon, LockIcon, ShieldCheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { signUp } from '@/lib/api/auth';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from 'next/link';


const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(4),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

type SignUpFormData = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
        const res = await signUp(data);
        toast.success(res.data.message);
        router.push(`/auth/verify-otp?email=${data.email}`);
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        const msg = error.response?.data?.message;
        if (msg?.includes('Email')) {
          setError('email', { type: 'manual', message: msg });
        } else if (msg?.includes('Username')) {
          setError('username', { type: 'manual', message: msg });
        } else {
          // fallback: show general error if you like
          toast.error(msg || 'Signup failed')
        }
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-h-[500px] space-y-8 rounded-xl bg-white p-10 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>

        <div className='relative'>
          {/* <Label>Username</Label> */}
          <UserIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('username')} placeholder="Username" className="pl-9"/>
          {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
        </div>

        <div className='relative'>
          {/* <Label>Email</Label> */}
          <MailIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={17} />
          <Input {...register('email')} type="email" placeholder="Email" className="pl-9"/>
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <LockIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="pl-9"
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
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs text-left">
              <p className="text-sm font-semibold mb-1">Password must include:</p>
              <ul className="text-xs list-disc pl-5 space-y-1">
                <li>At least 8 characters</li>
                <li>One lowercase letter</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character (@$!%*?&)</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='relative'>
          <ShieldCheckIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className='pl-9' />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full btn-ghost-custom" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>

        <p className='text-center text-sm text-gray-600'>
          Have an account?{' '}
          <Link href='/auth/login' className='font-medium text-blue-600 hover:underline'>Sign In</Link>
        </p>
      </form>
    </div>
  );
}
