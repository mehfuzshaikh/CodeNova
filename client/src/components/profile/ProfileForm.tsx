'use client';

import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateProfile } from '@/lib/api/user';
import ProfileField from './ProfileField';
import { updateUser } from '@/redux/features/auth/authSlice';


const ProfileForm: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [editingField, setEditingField] = useState<string | null>(null);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleUpdate = async (field: string, newValue: string) => {
    try {
      const res = await updateProfile({ [field]: newValue });
      dispatch(updateUser(res.data.user));
      alert('Profile updated successfully');
      setEditingField(null); // Close edit mode
    } catch {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow font-normal">
      <h2 className="text-xl font-bold mb-4">Basic Info</h2>
      {[
        { label: 'Name', field: 'name', value: user.name },
        { label: 'Gender', field: 'gender', value: user.gender },
        { label: 'Location', field: 'location', value: user.location },
        { label: 'Birthday', field: 'birthday', value: user.birthday },
        { label: 'Summary', field: 'summary', value: user.summary },
        { label: 'Website', field: 'website', value: user.website },
        { label: 'GitHub', field: 'github', value: user.github },
        { label: 'LinkedIn', field: 'linkedin', value: user.linkedin },
      ].map(({ label, field, value }) => (
        <ProfileField
          key={field}
          label={label}
          field={field}
          value={value || ''}
          isEditing={editingField === field}
          onEdit={(field) => setEditingField(field)}
          onSave={(newValue) => handleUpdate(field, newValue)}
          onCancel={() => setEditingField(null)}
        />
      ))}
    </div>
  );
};

export default ProfileForm;
