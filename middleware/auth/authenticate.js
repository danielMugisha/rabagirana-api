const jwt = require('jsonwebtoken');
const ApiResponse = require('../../utils/responses');

/**
 * Authentication middleware that verifies the JWT token
 */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return ApiResponse.unauthorized(res, "Authentication token required");
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return ApiResponse.forbidden(res, "Invalid or expired token");
    }
    req.user = user;
    next();
  });
};
