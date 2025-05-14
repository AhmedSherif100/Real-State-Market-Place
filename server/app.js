// Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Internal Modules
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRouter = require('./routes/authRoutes');
const propertyRouter = require('./routes/propertyRouter');

// Start Express app
const app = express();

// Middlewares
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(cors()); //modified for this for debugging puropses revert whenever solved

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true, // Allow cookies (e.g., JWT)
//   })
// );
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Routes
app.use('/api/properties/', propertyRouter);
app.use('/api/auth/', authRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

// Export app to server
module.exports = app;
