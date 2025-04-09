/**
 * Standard API response utility
 */
class ApiResponse {
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      status: "SUCCESS",
      message,
      data
    });
  }

  static created(res, message, data = null) {
    return this.success(res, message, data, 201);
  }

  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      status: "ERROR",
      message
    });
  }

  static badRequest(res, message) {
    return this.error(res, message, 400);
  }

  static notFound(res, message) {
    return this.error(res, message, 404);
  }

  static unauthorized(res, message = "Unauthorized access") {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = "Forbidden access") {
    return this.error(res, message, 403);
  }
}

module.exports = ApiResponse;
