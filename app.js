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

// Import routes
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
app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/stories', storyRoutes);
app.use('/api/manna', mannaRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Serve uploaded files statically if needed
app.use('/uploads', express.static('uploads'));

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
