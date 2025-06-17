'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon,EyeOffIcon } from 'lucide-react';
import { updatePassword } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { logout as logoutApi } from '@/lib/api/auth';
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';

const schema = yup.object().shape({
  currentPassword:yup.string().required('Current password is required'),
  newPassword:yup.string().required('Password is required').min(8,'New password must be at least 8 characters'),
  confirmNewPassword:yup
    .string()
    .oneOf([yup.ref('newPassword')],'Passwords must match')
    .required('Confirm password is required')
})

type UpdatePasswordFormData = yup.InferType<typeof schema>;

const ChangePasswordPage = () => {
  const router = useRouter();
  const [showPassword,setShowPassword] = useState(false);
  const [showNewPassword,setShowNewPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState:{errors,isSubmitting},
  } = useForm<UpdatePasswordFormData>({
    resolver:yupResolver(schema)
  })

  const onSubmit = async(data:UpdatePasswordFormData)=>{
    try {
        const res = await updatePassword(data);
        toast.success(`${res.data.message}. Please login again`);
        await logoutApi()
        dispatch(logout())
        router.push(`auth/login`);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message;
      if(msg){
        if (msg.includes("Invalid current password")) {
          setError("currentPassword", { type: "server", message: msg });
        } else if (msg.includes("Passwords and confirm password should match")) {
          setError("confirmNewPassword", { type: "server", message: msg });
        } else if (msg.includes("All fields are required")) {
          setError("currentPassword", { type: "server", message: msg });
          setError("newPassword", { type: "server", message: msg });
          setError("confirmNewPassword", { type: "server", message: msg });
        } else {
          setError("currentPassword", { type: "server", message: "An unexpected error occurred" });
        }
      }
    }
  }
  return (
    <ProtectedUserRoute>
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md min-h-[400px] space-y-8 rounded-xl bg-white p-10 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Change password</h2>

        <div className="relative">
          <LockIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('currentPassword')} placeholder='Current password' type={showPassword?'text':'password'} className='pl-9'/>
          <button type='button' onClick={()=>setShowPassword(!showPassword)}  className="absolute right-3 top-2 text-gray-500">
          {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {errors.currentPassword && <p className="text-sm text-red-600">{errors.currentPassword.message}</p>}
        </div>

        <div className="relative">
          <ShieldCheckIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('newPassword')} placeholder='New password' type={showNewPassword?'text':'password'} className='pl-9'/>
          <button type='button' onClick={()=>setShowNewPassword(!showNewPassword)}  className="absolute right-3 top-2 text-gray-500">
          {showNewPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>

        <div className="relative">
          <ShieldCheckIcon className="absolute left-3 top-4.5 -translate-y-1/2 text-gray-400" size={18} />
          <Input {...register('confirmNewPassword')} placeholder='Confirm new password' type='password' className='pl-9'/>
          {errors.confirmNewPassword && <p className="text-sm text-red-600">{errors.confirmNewPassword.message}</p>}
        </div>

        <Button type='submit' disabled={isSubmitting} className="w-full btn-ghost-custom" >
          {isSubmitting ? 'Changing password...':'Change password'}
        </Button>
        
      </form>
    </div>
    </ProtectedUserRoute>
  )
}

export default ChangePasswordPage
