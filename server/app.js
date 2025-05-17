// Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Internal Modules
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRoutes = require('./routes/authRoutes');
const propertyRouter = require('./routes/propertyRouter');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRouter');

// Load env vars
dotenv.config({ path: './config.env' });
// Start Express app
const app = express();

// Middlewares
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Routes
app.use('/api/properties/', propertyRouter);
app.use('/api/auth/', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Catch-all for 404
app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Export app to server
module.exports = app;
