import React from 'react'
import BasicInfo from '@/components/mainProfile/BasicInfo';
import SolvedProblemsStats from '@/components/mainProfile/SolvedProblemsStats';
import ProfileStatsCards from '@/components/mainProfile/ProfileStatsCards';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-70">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <BasicInfo />
          </div>
          <div className="w-full md:w-2/3 md:ml-">
            <SolvedProblemsStats />
            <ProfileStatsCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;