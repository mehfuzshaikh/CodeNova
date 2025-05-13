"use client";

import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";
import { deleteUser } from "@/lib/api/user";
import { logout as logoutApi } from "@/lib/api/auth";
import { logout } from "@/redux/features/auth/authSlice";
import ProtectedUserRoute from "@/components/shared/ProtectedUserRoute";

const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!user) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteUser(password);
      toast.success(response.data.message);
      await logoutApi();
      dispatch(logout());
      router.push("/");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || "Failed to delete account";
      setError(msg);
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedUserRoute>
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-22">
      <div className="w-full max-w-4xl min-h-[400px] space-y-8 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-15">
          Account Information
        </h2>

        <div className="space-y-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="w-2/3">
              <span className="text-gray-600 pl-20">Username</span>
            </div>
            <div className="flex-1 flex items-center">
              <span className="font-medium">{user.username}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="w-2/3">
              <span className="text-gray-600 pl-20">Email</span>
            </div>
            <div className="flex-1 flex items-center">
              <span className="font-medium">{user.email}</span>
              {user.isVerified && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Verified
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="w-2/3">
              <span className="text-gray-600 pl-20">Password</span>
            </div>
            <div className="flex-1">
              <button
                className="cursor-pointer text-blue-500 hover:text-blue-700 flex items-center"
                onClick={() => router.push("/change-password")}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="pt-7">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer w-40 flex justify-center items-center px-4 py-4 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-colors"
          >
            <FiTrash2 className="mr-2" />
            Delete Account
          </Button>
          <p className="mt-2 text-center text-sm text-gray-500">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title="Confirm Account Deletion"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Please enter your password to confirm:
            </p>
            <Input
              type="password"
              placeholder="Password"
              value={password}  
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="text-white bg-red-700 hover:bg-red-800"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
    </ProtectedUserRoute>
  );
};

export default AccountPage;
