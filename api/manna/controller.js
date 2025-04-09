const MannaRepo = require('./repo');
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
        
        const result = await MannaRepo.create(
            title.trim(), 
            summary.trim(), 
            content.trim(), 
            author.trim(), 
            featuredImage
        );
        
        return ApiResponse.created(res, "Manna created successfully", result);
    } catch (err) {
        Logger.error("Error creating manna", err);
        return ApiResponse.error(res, "An error occurred while saving manna");
    }
}; 

exports.update = async (req, res) => {
    try {
        const mannaId = req.params.mannaId;
        const {title, summary, content, author} = req.body;
        const featuredImage = req.file?.path;
        
        // Validate inputs
        if(!title?.trim() || !summary?.trim() || !content?.trim() || !author?.trim()) {
            return ApiResponse.badRequest(res, "All fields are required: title, summary, content, author");
        }
        
        const result = await MannaRepo.update(
            mannaId, 
            title.trim(), 
            summary.trim(), 
            content.trim(), 
            author.trim(),
            featuredImage
        );
        
        return ApiResponse.success(res, "Manna updated successfully", result);
    } catch (err) {
        Logger.error("Error updating manna", err);
        if (err.message === 'Manna not found') {
            return ApiResponse.notFound(res, "Manna not found");
        }
        return ApiResponse.error(res, "An error occurred while updating manna article");
    }
}; 

exports.getAll = async (req, res) => {
    try {
        const results = await MannaRepo.getAll();
        return ApiResponse.success(res, "All manna articles retrieved successfully", results);
    } catch (err) {
        Logger.error("Error retrieving all manna articles", err);
        return ApiResponse.error(res, "An error occurred while getting all manna articles");
    }
}; 

exports.getById = async (req, res) => {
    try {
        const mannaId = req.params.mannaId;
        const result = await MannaRepo.getById(mannaId);
        return ApiResponse.success(res, "Manna article retrieved successfully", result);
    } catch (err) {
        Logger.error(`Error retrieving manna ${req.params.mannaId}`, err);
        if (err.message === 'Manna not found') {
            return ApiResponse.notFound(res, "Manna not found");
        }
        return ApiResponse.error(res, "An error occurred while getting manna article");
    }
}; 

exports.getLatest = async (req, res) => {
    try {
        const result = await MannaRepo.getLatest();
        return ApiResponse.success(res, "Latest manna article retrieved successfully", result);
    } catch (err) {
        Logger.error("Error retrieving latest manna article", err);
        if (err.message === 'No manna articles found') {
            return ApiResponse.notFound(res, "No manna articles found");
        }
        return ApiResponse.error(res, "An error occurred while getting the latest manna article");
    }
};
    
exports.delete = async (req, res) => {
    try {
        const mannaId = req.params.mannaId;
        await MannaRepo.delete(mannaId);
        return ApiResponse.success(res, "Manna deleted successfully");
    } catch (err) {
        Logger.error(`Error deleting manna ${req.params.mannaId}`, err);
        if (err.message === 'Manna not found') {
            return ApiResponse.notFound(res, "Manna not found");
        }
        return ApiResponse.error(res, "An error occurred while deleting manna article");
    }
};

