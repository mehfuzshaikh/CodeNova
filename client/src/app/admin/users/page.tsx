'use client';

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchAdminUsers } from '@/redux/features/admin/users/userAction';
import UserTable from '@/components/admin/UserTable';
import { Loader2 } from 'lucide-react';
import ProtectedAdminRoute from '@/components/shared/ProtectedAdminRoute';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const AdminUsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.adminUsers);

  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const [joinedFrom, setJoinedFrom] = useState('');
  const [joinedTo, setJoinedTo] = useState('');

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleClearFilters = () => {
    setSearch('');
    setGender('all');
    setJoinedFrom('');
    setJoinedTo('');
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullText = `${user.username} ${user.email} ${user.name ?? ''} ${user.location ?? ''}`.toLowerCase();
      const matchSearch = search === '' || fullText.includes(search.toLowerCase());

      const matchGender =
        gender === 'all' ||
        (gender === 'Not specified'
          ? !user.gender
          : user.gender?.toLowerCase() === gender.toLowerCase());

        const joinedDate = new Date(user.createdAt).getTime();
        const fromDate = joinedFrom ? new Date(joinedFrom).getTime() : null;
        const toDate = joinedTo
        ? new Date(new Date(joinedTo).setHours(23, 59, 59, 999)).getTime()
        : null;

        const matchDate =
        (!fromDate || joinedDate >= fromDate) &&
        (!toDate || joinedDate <= toDate);

      return matchSearch && matchGender && matchDate;
    });
  }, [users, search, gender, joinedFrom, joinedTo]);

  return (
    <ProtectedAdminRoute>
      <div className="p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center sm:text-center">
          👥 All Registered Users
        </h1>
          <div className="p-4 flex flex-wrap gap-4 justify-between mb-2">
            <Input
              placeholder="🔍 Search by Username, Email, Name, Location"
              className="w-full sm:w-[400px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-end">
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Not specified">Not specified</SelectItem>
                </SelectContent>
              </Select>

              <label className="text-sm font-medium text-gray-600 mt-2.5">
                Joined From:
              </label>
              <Input
                type="date"
                value={joinedFrom}
                onChange={(e) => setJoinedFrom(e.target.value)}
                className="w-full sm:w-40"
              />

               <label className="text-sm font-medium text-gray-600 mt-2.5">
                Joined To:
              </label>
              <Input
                type="date"
                value={joinedTo}
                onChange={(e) => setJoinedTo(e.target.value)}
                className="w-full sm:w-40"
              />

              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full sm:w-auto whitespace-nowrap bg-gray-300 hover:bg-gray-400"
              >
                Clear Filters
              </Button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin mr-2" /> Loading users...
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center">Error: {error}</div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <UserTable users={filteredUsers} />
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center text-gray-500">No users found.</div>
        )}
      </div>
    </ProtectedAdminRoute>
  );
};

export default AdminUsersPage;
