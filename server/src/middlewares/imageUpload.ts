import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../db/cloudinaryConfig';

const allowedFormats = ['jpg', 'jpeg', 'png'];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'profile_images', 
      format: file.mimetype.split('/')[1],  
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    };
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if (!allowedFormats.includes(ext)) {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

export default upload;
