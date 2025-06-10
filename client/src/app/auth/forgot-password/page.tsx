"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/lib/api/auth';
import { toast } from 'sonner';
import { MailIcon } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
});

export default function ForgotPasswordPage()
{
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
      });

      const onSubmit = async (data: { email: string }) => {
        try {
          const res = await forgotPassword(data.email);
          toast.success(res.data.message || 'Reset link sent. Check your email.');
          router.push('/auth/reset-password/success');
        } catch (err) {
          const error = err as { response?: { data?: { message?: string } } };
          const msg = error.response?.data?.message || 'Something went wrong';
          setError('email', { type: 'manual', message: msg });
        }
      };
    return(
        <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-35">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Reset your password</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
            Enter your registered email and we will send you a password reset link.
            </p>

            <div className='relative'>
            <MailIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={17} />
            <Input {...register('email')} type="email" placeholder="Email" className='pl-9' />
            {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
            </div>

            <Button type="submit" className="w-full btn-ghost-custom" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
        </form>
    </div>
    )
}