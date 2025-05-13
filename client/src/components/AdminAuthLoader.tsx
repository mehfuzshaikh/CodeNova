'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { loadAdmin } from '@/redux/features/admin/authActions';

export default function AdminAuthLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch]);

  return null;
}
