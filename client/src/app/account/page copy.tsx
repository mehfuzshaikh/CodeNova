import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const AccountPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!user) return null;

  return (
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
              <button className="cursor-pointer text-blue-500 hover:text-blue-700 flex items-center" onClick={() => router.push('/change-password')}>
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="pt-7">
          <button className="cursor-pointer w-40 flex justify-center items-center px-4 py-3 mx-auto border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-colors">
            <FiTrash2 className="mr-2" />
            Delete Account
          </button>
          <p className="mt-2 text-center text-sm text-gray-500">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

return (
  <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-22">
    <div className="w-full max-w-4xl min-h-[400px] space-y-8 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-center mb-15">
        Account Information
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-gray-600">Username</span>
          <span className="font-medium">{user.username}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-gray-600">Email</span>
          <span className="font-medium">{user.email}</span>
        </div>
      </div>

      <div className="pt-7">
        <Button
          variant="destructive"
          onClick={() => setIsModalOpen(true)}
          className="w-40 mx-auto flex justify-center items-center"
        >
          <FiTrash2 className="mr-2" />
          Delete Account
        </Button>
        <p className="mt-2 text-center text-sm text-gray-500">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
      </div>
    </div>

    {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)} title="Confirm Account Deletion">
        <div className="space-y-4">
          <p className="text-gray-600">Please enter your password to confirm:</p>
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
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    )}
  </div>
);