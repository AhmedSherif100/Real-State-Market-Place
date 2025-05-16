const dotenv = require('dotenv');
dotenv.config({ path: `../.env` });
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create Uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Internal Modules
const app = require('./app');

// Add the upload route to the app with logging
app.post('/api/uploads', upload.array('media', 10), (req, res) => {
  console.log('Received upload request at /api/uploads'); // Debug log
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const filePaths = files.map((file) => ({
      filename: file.filename,
      path: `/Uploads/${file.filename}`,
    }));
    res
      .status(200)
      .json({ message: 'Files uploaded successfully', files: filePaths });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Confirm route registration
console.log('Upload route registered at /api/uploads');

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  `<db_password>`,
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB connection is successful.`);
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Application running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB connection failed: ', err);
    process.exit(1);
  });
