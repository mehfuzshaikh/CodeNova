'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-32">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="text-sm text-gray-600">
          We’ve sent a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
        </p>

        <Button className="w-full" onClick={() => router.push('/auth/login')}>
          Return to Sign In
        </Button>
      </div>
    </div>
  );
}
