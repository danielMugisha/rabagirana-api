const Resource = require ('./repo')

exports.create = async (req, res) => {
    const {name, category} = req.body;
    const featuredFile = req.file.path;
    name.trim();
    category.trim();
    if(name == "" || category == ""){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Empty fields'
        })
    }
    Resource.create(name, category, featuredFile)
    .then(results => {
        res.status(201)
        .json({
            status:"CREATED", 
            message:"Resource created successfully"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            message: 'an error occured while saving resource'
        })
    });
} 

exports.getAll = async (req, res) => {
    Resource.getAll()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"All resources retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting all resources'
            })
        })
} 

exports.getById = async (req, res) => {
    const resourceId = req.params.resourceId;
    Resource.getById(resourceId)
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"resource retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting resource'
            })
        })
} 
    
exports.delete = async (req, res) => {
    const resourceId = req.params.resourceId;
    Resource.delete(resourceId)
        .then(results => {
            res.status(200).json({
            status:"DELETED", 
            message:"Resource deleted successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while deleting resource'
            })
        });
} 
    
