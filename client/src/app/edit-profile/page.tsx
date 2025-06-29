import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute';

export default function EditProfilePage() {
  return (
    <ProtectedUserRoute>
    <div className="w-screen mx-auto min">
        <ProfileHeader />
      <div className="w-full flex justify-center">
        <div className="bg-white p-6 rounded shadow-md mt-6 min-w-3xl">
          <ProfileForm />
        </div>
      </div>
    </div>
    </ProtectedUserRoute>
  );
}
