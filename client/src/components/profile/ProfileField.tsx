'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface ProfileFieldProps {
  label: string;
  value: string;
  field: string;
  isEditing: boolean;
  onEdit: (field: string) => void;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  field,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <span className="font-normal">{label}</span>
      {isEditing ? (
        <div className="flex items-center gap-2">
          {field === 'gender' ? (
            <Select onValueChange={setInputValue} defaultValue={value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          ) : field === 'birthday' ? (
            <Input
              type="date"
              className="w-[180px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <Input
              className="w-[180px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          <Button onClick={handleSave} className="bg-blue-500 text-white">Save</Button>
          <Button onClick={onCancel} variant="secondary">Cancel</Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>{value || 'Not provided'}</span>
          <Button onClick={() => onEdit(field)} variant="link" className="text-blue-500">Edit</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileField;
