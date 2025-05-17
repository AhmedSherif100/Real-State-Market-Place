// Core Modules
const path = require('path');

// 3rd Party Modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

// Internal Modules
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authRouter = require('./routes/authRoutes');
const propertyRouter = require('./routes/propertyRouter');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// Start Express app
const app = express();

// Middlewares
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Routes
app.use('/api/properties/', propertyRouter);
app.use('/api/auth/', authRouter);
app.use('/api/agents', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
// Catch-all for 404
app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Export app to server
module.exports = app;
