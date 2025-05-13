"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  children: React.ReactNode;
}

const ProtectedUserRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to ensure Redux state is fully loaded
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
      setIsLoading(false);
    }, 100); // Small delay to wait for state

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Show a loader or nothing while waiting for the state
  if (isLoading) return null;

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedUserRoute;
