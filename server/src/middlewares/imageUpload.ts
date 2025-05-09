import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../db/cloudinaryConfig';
import { Request, Response, NextFunction } from 'express';

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
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    if (!allowedFormats.includes(ext)) {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB
  },
});

const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  try {
    upload.single('profileImg')(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred (like file too large)
        res.status(400).json({ message: err.message });
        return;
      } else if (err) {
        // An unknown error occurred (like wrong file type)
        res.status(400).json({ message: err.message });
        return; 
      }
      next();
    });
  } catch (error) {
    res.status(400).json({message:"Something went wrong",error: (error as Error).message });
  }
  
};

export default uploadImage;
