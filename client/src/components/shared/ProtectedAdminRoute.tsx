"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isAdminAuthenticated } = useAppSelector((state) => state.adminAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAdminAuthenticated) {
        router.push('/admin/login');
      }
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [isAdminAuthenticated, router]);
    
  if (isLoading) return null;

  return isAdminAuthenticated ? <>{children}</> : null;
};

export default ProtectedAdminRoute;
