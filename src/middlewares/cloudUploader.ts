import type { RequestHandler } from 'express';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
});

const cloudinaryUpload: RequestHandler = async (req, res, next) => {
  try {
    const file = (req as any).file;
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'users' },
        (error, result) => {
          if (error || !result) reject(error || new Error('Upload failed'));
          else resolve({ secure_url: result.secure_url });
        }
      );
      stream.end(fs.readFileSync(file.filepath));
    });

    (req.body as any).image = uploadResult.secure_url;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};
export default cloudinaryUpload;
