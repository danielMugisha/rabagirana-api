const StoryRepo = require('./repo');
const ApiResponse = require('../../utils/responses');
const Logger = require('../../utils/logger');

exports.create = async (req, res) => {
    try {
        const {title, summary, content, author} = req.body;
        
        if(!req.file) {
            return ApiResponse.badRequest(res, "Featured image is required");
        }
        
        const featuredImage = req.file.path;
        
        // Validate inputs
        if(!title?.trim() || !summary?.trim() || !content?.trim() || !author?.trim()) {
            return ApiResponse.badRequest(res, "All fields are required: title, summary, content, author");
        }
        
        const result = await StoryRepo.create(
            title.trim(), 
            summary.trim(), 
            content.trim(), 
            author.trim(), 
            featuredImage
        );
        
        return ApiResponse.created(res, "Story created successfully", result);
    } catch (err) {
        Logger.error("Error creating story", err);
        return ApiResponse.error(res, "An error occurred while saving story");
    }
}; 

exports.update = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const {title, summary, content, author} = req.body;
        const featuredImage = req.file?.path;
        
        // Validate inputs
        if(!title?.trim() || !summary?.trim() || !content?.trim() || !author?.trim()) {
            return ApiResponse.badRequest(res, "All fields are required: title, summary, content, author");
        }
        
        const result = await StoryRepo.update(
            storyId, 
            title.trim(), 
            summary.trim(), 
            content.trim(), 
            author.trim(),
            featuredImage
        );
        
        return ApiResponse.success(res, "Story updated successfully", result);
    } catch (err) {
        Logger.error("Error updating story", err);
        if (err.message === 'Story not found') {
            return ApiResponse.notFound(res, "Story not found");
        }
        return ApiResponse.error(res, "An error occurred while updating story");
    }
}; 

exports.getAll = async (req, res) => {
    try {
        const results = await StoryRepo.getAll();
        return ApiResponse.success(res, "All stories retrieved successfully", results);
    } catch (err) {
        Logger.error("Error retrieving all stories", err);
        return ApiResponse.error(res, "An error occurred while getting all stories");
    }
}; 

exports.getById = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const result = await StoryRepo.getById(storyId);
        return ApiResponse.success(res, "Story retrieved successfully", result);
    } catch (err) {
        Logger.error(`Error retrieving story ${req.params.storyId}`, err);
        if (err.message === 'Story not found') {
            return ApiResponse.notFound(res, "Story not found");
        }
        return ApiResponse.error(res, "An error occurred while getting story");
    }
}; 
  
exports.delete = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        await StoryRepo.delete(storyId);
        return ApiResponse.success(res, "Story deleted successfully");
    } catch (err) {
        Logger.error(`Error deleting story ${req.params.storyId}`, err);
        if (err.message === 'Story not found') {
            return ApiResponse.notFound(res, "Story not found");
        }
        return ApiResponse.error(res, "An error occurred while deleting story");
    }
};

