"use client";

import React, { useState, useCallback, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { updateProfile } from "@/lib/api/user";
import { updateUser } from "@/redux/features/auth/authSlice";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const ImageUploadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setError(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [isOpen]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError("Only JPEG and PNG images are allowed!");
      return;
    }
    console.log("This is for file size", file.size);
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 1MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setError(null); // Reset error if valid
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  const handleImageSave = async (imageUrl: string | null) => {
    console.log(imageUrl);
    if (!imageUrl) return setError("No image selected");
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Check if the imageUrl is a Base64 string
      if (imageUrl.startsWith("data:image")) {
        // Convert Base64 to Blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "profile.png", { type: blob.type });
  
        // Append the file to the FormData object
        formData.append("profileImg", file);
      }
  
      // Make the API call with FormData
      const response = await updateProfile(formData);
      if (response?.user?.profileImg) {
        console.log("Profile image updated successfully");
        dispatch(updateUser({ profileImg: response.user.profileImg }));
        onClose();
        alert("Profile picture updated successfully");
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error?.response?.data?.message || "Failed to update profile picture";
      setError(errorMessage);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4">
        <DialogTitle>Upload a New Avatar</DialogTitle>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <div className="relative w-full h-64 bg-gray-100">
          {image ? (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No image selected</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 justify-center">
          <Input type="file" accept="image/*" onChange={onImageChange} />
        </div>

        <div className="text-xs">
          <p>
            <b className="text-red-500">Note:</b>Only image files (JPG, JPEG,
            PNG) are allowed. Maximum file size: 1 MB.
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white"
            onClick={() => handleImageSave(image)}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
