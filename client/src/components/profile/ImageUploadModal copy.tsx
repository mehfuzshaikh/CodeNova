// 'use client';

// import { useState } from 'react';
// import Modal from 'react-modal';
// import AvatarEditor from 'react-avatar-edit';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';

// interface ImageUploadModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (image: string) => void;
// }

// const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onSave }) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleCrop = (image: string) => {
//     setPreview(image);
//   };

//   const handleSave = () => {
//     if (preview) {
//       onSave(preview);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Upload a New Avatar"
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-25"
//     >
//       <div className="bg-white p-5 rounded-md w-[400px] text-center">
//         <h2 className="text-xl font-semibold mb-4">Upload a New Avatar</h2>
//         <AvatarEditor
//           width={300}
//           height={300}
//           onCrop={handleCrop}
//           onClose={() => setPreview(null)}
//         />
//         {preview && (
//           <Image src={preview} alt="Preview" className="mt-4 w-[100px] h-[100px] rounded-full mx-auto" />
//         )}
//         <div className="mt-4 flex justify-center gap-3">
//           <Button onClick={handleSave} className="bg-blue-500 text-white">Save</Button>
//           <Button onClick={onClose} variant="secondary">Cancel</Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ImageUploadModal;
