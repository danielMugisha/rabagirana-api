const SubscriptionRepo = require("./repo");
const ApiResponse = require("../../utils/responses");
const Logger = require("../../utils/logger");

exports.create = async (req, res) => {
  try {
    const { email, status } = req.body;
    
    if (!email || !status) {
      return ApiResponse.badRequest(res, "Email and status are required");
    }

    const trimmedEmail = email.trim();
    const trimmedStatus = status.trim();
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return ApiResponse.badRequest(res, "Invalid email format");
    }

    const result = await SubscriptionRepo.create(trimmedEmail, trimmedStatus);
    return ApiResponse.created(res, "Subscription created successfully", result);
  } catch (err) {
    Logger.error("Error in subscription controller", err);
    return ApiResponse.error(
      res, 
      err.message || "An error occurred while subscribing"
    );
  }
};
