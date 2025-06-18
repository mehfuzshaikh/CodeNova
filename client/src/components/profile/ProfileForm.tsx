'use client';

import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateProfile } from '@/lib/api/user';
import ProfileField from './ProfileField';
import { updateUser } from '@/redux/features/auth/authSlice';
import {
  FaUser,
  FaVenusMars,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaAlignLeft,
  FaGlobe,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const formatDate = (datestring:string):string=>{
  if(!datestring) return '';
  const date = new Date(datestring);
  return date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})
};

const formatUrl = (value: string, baseUrl: string): string => {
  if(!value) return '';
  value = value.trim()

  if(value.startsWith('https://')){
      return value;
  }
  return `${baseUrl}${value}`;
};

const ProfileForm: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [editingField, setEditingField] = useState<string | null>(null);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleUpdate = async (field: string, newValue: string) => {
    try {
      if (field === 'birthday') {
        if (new Date(newValue) > new Date()) {
          alert("Birthday cannot be in the future.");
          return;
        }
      }
      const formData = new FormData();
      formData.append(field,newValue);
      await updateProfile(formData);
      dispatch(updateUser({ [field]: newValue }));
      setEditingField(null); // Close edit mode
    } catch {
      setEditingField(null);
    }
  };

  return (
    <div className="p-4 text-sm bg-white rounded shadow font-normal">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Basic Info</h2>
      {[
        { label: 'Name', field: 'name', value: user.name, icon: FaUser },
        { label: 'Gender', field: 'gender', value: user.gender, icon: FaVenusMars },
        { label: 'Location', field: 'location', value: user.location, icon: FaMapMarkerAlt },
        { label: 'Birthday', field: 'birthday', value: formatDate(user.birthday), icon: FaBirthdayCake },
        { label: 'Summary', field: 'summary', value: user.summary, icon: FaAlignLeft },
        { label: 'Website', field: 'website', value: formatUrl(user.website,'https://'), icon: FaGlobe },
        { label: 'GitHub', field: 'github', value: formatUrl(user.github,'https://github.com/'), icon: FaGithub },
        { label: 'LinkedIn', field: 'linkedin', value: formatUrl(user.linkedin,'https://linkedin.com/in/'), icon: FaLinkedin },
      ].map(({ label, field, value, icon }) => (
        <ProfileField
          key={field}
          label={label}
          field={field}
          value={value || ''}
          isEditing={editingField === field}
          onEdit={(field) => setEditingField(field)}
          onSave={(newValue) => handleUpdate(field, newValue)}
          onCancel={() => setEditingField(null)}
          icon={icon}
        />
      ))}
    </div>
  );
};

export default ProfileForm;
