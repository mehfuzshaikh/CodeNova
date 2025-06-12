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
  icon: React.ElementType;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  field,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  icon:Icon
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
  };
  return (
    <div className="flex justify-between items-start py-2 border-b">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 font-normal text-gray-700 pr-15">
            <Icon />
            <span>{label}</span>
          </div>
          {field === "gender" ? (
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
          ) : field === "birthday" ? (
            <Input
              type="date"
              className="w-[180px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <Input
              className="w-[200px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          <Button
            onClick={handleSave}
            className="bg-blue-500 text-white hover:bg-blue-900"
          >
            Save
          </Button>
          <Button
            onClick={onCancel}
            variant="secondary"
            className="hover:bg-gray-300"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-gray-700 w-2/3">
            <Icon />
            <span className="whitespace-nowrap w-32">{label}</span>
            <span className="truncate text-gray-700">
              {value || "Not provided"}
            </span>
          </div>
          <Button
            onClick={() => onEdit(field)}
            variant="link"
            className="text-blue-600"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileField;
