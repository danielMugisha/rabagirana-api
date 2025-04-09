const ApiResponse = require('../utils/responses');
const Logger = require('../utils/logger');

/**
 * Global error handling middleware
 */
function errorHandler(err, req, res, next) {
  Logger.error(`Unhandled error: ${err.message}`, err);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return ApiResponse.badRequest(res, err.message || 'Validation error');
  }
  
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return ApiResponse.badRequest(res, 'Invalid ID format');
  }
  
  if (err.code === 11000) { // MongoDB duplicate key error
    return ApiResponse.badRequest(res, 'Duplicate entry error');
  }
  
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid token');
  }
  
  if (err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Token expired');
  }
  
  // Default server error
  return ApiResponse.error(
    res, 
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message || 'Internal server error'
  );
}

module.exports = errorHandler;
