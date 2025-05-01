'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signUp } from '@/lib/api/auth';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(4),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
        const res = await signUp(data);
        alert(res.data.message);
        router.push(`/auth/verify-otp?email=${data.email}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        const msg = err.response?.data?.message;

        if (msg?.includes('Email')) {
          setError('email', { type: 'manual', message: msg });
        } else if (msg?.includes('Username')) {
          setError('username', { type: 'manual', message: msg });
        } else {
          // fallback: show general error if you like
          alert(msg || 'Signup failed');
        }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Create an account</h2>

        <div>
          {/* <Label>Username</Label> */}
          <Input {...register('username')} placeholder="Username" />
          {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
        </div>

        <div>
          {/* <Label>Email</Label> */}
          <Input {...register('email')} type="email" placeholder="Email" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="relative">
          {/* <Label>Password</Label> */}
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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

        <div>
          {/* <Label>Confirm Password</Label> */}
          <Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}
