import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';

export default function EditProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileHeader />
      <div className="bg-white p-6 rounded shadow-md mt-6">
        {/* <h2 className="text-xl font-semibold mb-4">Edit Profile</h2> */}
        <ProfileForm />
      </div>
    </div>
  );
}
