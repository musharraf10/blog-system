const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./Cloudinary'); // Ensure this is correct

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("File Received:", file);

    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
    const fileExtension = file.mimetype.split('/')[1]; // Get file extension

    return {
      folder: 'step_guides',
      format: fileExtension || 'jpg', // Default to jpg if format missing
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`,
      resource_type: resourceType,
      allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'webp'], // Explicit allowed formats
    };
  },
});

// Multer Middleware
const upload = multer({ storage });

module.exports = upload;
