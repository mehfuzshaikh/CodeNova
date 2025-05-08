// 'use client';

// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Image from 'next/image';
// import { RootState } from '@/redux/store';
// import { Button } from '../ui/button';
// import ImageUploadModal from './ImageUploadModal';
// import { updateProfile } from '@/lib/api/user';
// import { updateUser } from '@/redux/features/auth/authSlice';

// const ProfileHeader: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch();

//   if (!user) return null;

//   const handleImageSave = async (imageUrl: string) => {
//     try {
//       await updateProfile({ profileImg: imageUrl });
//       dispatch(updateUser({ profileImg: imageUrl }));
//       alert('Profile picture updated successfully');
//     } catch {
//       alert('Failed to update profile picture');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 shadow-lg">
//       <div className="flex items-center gap-8">
//         <Image 
//           src={user.profileImg || '/default-avatar.png'} 
//           alt="Profile Picture" 
//           width={120} 
//           height={120} 
//           className="rounded-full border-4 border-white"
//         />
//         <Button variant="link" className="text-blue-600" onClick={() => setIsModalOpen(true)}>Edit</Button>
//         <div>
//           <h2 className="text-2xl font-semibold">{user.name || 'User Name'}</h2>
//           <p className="text-gray-300">Username: {user.username || 'username'}</p>
//         </div>
//       </div>

//       <ImageUploadModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleImageSave}
//       />
//     </div>
//   );
// };

// export default ProfileHeader;