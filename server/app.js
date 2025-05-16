// Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');

// Internal Modules
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRouter = require('./routes/authRoutes');
const propertyRouter = require('./routes/propertyRouter');

// Start Express app
const app = express();

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

app.use('/api/uploads', express.static(uploadDir));

// Upload middleware
app.post('/api/uploads', upload.array('media', 10), (req, res) => {
  console.log('Received upload request at /api/uploads');
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const filePaths = files.map((file) => ({
      filename: file.filename,
      path: file.filename, // Return just the filename
    }));
    res
      .status(200)
      .json({ message: 'Files uploaded successfully', files: filePaths });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Middlewares
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(cors()); // Keep as is for debugging

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Routes
app.use('/api/properties/', propertyRouter);
app.use('/api/auth/', authRouter);

// Catch-all for 404
app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Export app to server
module.exports = app;
