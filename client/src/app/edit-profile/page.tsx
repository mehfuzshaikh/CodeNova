import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute';

export default function EditProfilePage() {
  return (
    <ProtectedUserRoute>
    <div className="w-screen mx-auto">
        <ProfileHeader />
      <div className="bg-white p-6 rounded shadow-md mt-6 max-w-4xl">
        {/* <h2 className="text-xl font-semibold mb-4">Edit Profile</h2> */}
        <ProfileForm />
      </div>
    </div>
    </ProtectedUserRoute>
  );
}
