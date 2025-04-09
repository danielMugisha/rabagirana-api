const ResourceRepo = require('./repo');
const ApiResponse = require('../../utils/responses');
const Logger = require('../../utils/logger');

exports.create = async (req, res) => {
    try {
        const {name, category} = req.body;
        
        if(!req.file) {
            return ApiResponse.badRequest(res, "File is required");
        }
        
        const featuredFile = req.file.path;
        
        // Validate inputs
        if(!name?.trim() || !category?.trim()) {
            return ApiResponse.badRequest(res, "Name and category are required");
        }
        
        const result = await ResourceRepo.create(
            name.trim(), 
            category.trim(), 
            featuredFile
        );
        
        return ApiResponse.created(res, "Resource created successfully", result);
    } catch (err) {
        Logger.error("Error creating resource", err);
        return ApiResponse.error(res, "An error occurred while saving resource");
    }
}; 

exports.getAll = async (req, res) => {
    try {
        const results = await ResourceRepo.getAll();
        return ApiResponse.success(res, "All resources retrieved successfully", results);
    } catch (err) {
        Logger.error("Error retrieving all resources", err);
        return ApiResponse.error(res, "An error occurred while getting all resources");
    }
}; 

exports.getById = async (req, res) => {
    try {
        const resourceId = req.params.resourceId;
        const result = await ResourceRepo.getById(resourceId);
        return ApiResponse.success(res, "Resource retrieved successfully", result);
    } catch (err) {
        Logger.error(`Error retrieving resource ${req.params.resourceId}`, err);
        if (err.message === 'Resource not found') {
            return ApiResponse.notFound(res, "Resource not found");
        }
        return ApiResponse.error(res, "An error occurred while getting resource");
    }
}; 
    
exports.delete = async (req, res) => {
    try {
        const resourceId = req.params.resourceId;
        await ResourceRepo.delete(resourceId);
        return ApiResponse.success(res, "Resource deleted successfully");
    } catch (err) {
        Logger.error(`Error deleting resource ${req.params.resourceId}`, err);
        if (err.message === 'Resource not found') {
            return ApiResponse.notFound(res, "Resource not found");
        }
        return ApiResponse.error(res, "An error occurred while deleting resource");
    }
};

