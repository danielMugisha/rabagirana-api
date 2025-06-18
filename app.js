/**
 * Main application file - modify or create as needed
 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const validateEnv = require('./config/envValidator');
const errorHandler = require('./middleware/errorHandler');
const Logger = require('./utils/logger');
const path = require('path');

// Import routes
const authRoutes = require('./middleware/auth/auth');
const storyRoutes = require('./api/story/router');
const mannaRoutes = require('./api/manna/router');
const eventRoutes = require('./api/event/router');
const resourceRoutes = require('./api/resource/router');
const subscriptionRoutes = require('./api/subscription/router');

// Validate environment variables
validateEnv();

// Initialize express app
const app = express();

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure static file serving for uploads
app.use('/uploads', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cache-Control': 'public, max-age=31536000'
  });
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/manna', mannaRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Rabagirana API is running' });
});

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({
    status: 'ERROR',
    message: 'Resource not found'
  });
});

// Global error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    Logger.info('Connected to MongoDB');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      Logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    Logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  Logger.error('Unhandled Promise Rejection:', err);
});

module.exports = app;
