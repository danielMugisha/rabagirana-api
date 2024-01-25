const Story = require ('./repo')

exports.create = async (req, res) => {
    const {title, summary, content, author} = req.body;
    const featuredImage = req.file.path;
    title.trim();
    summary.trim();
    content.trim();
    author.trim();
    if(title == "" || summary == "" || content =="" || author ==""){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Empty fields'
        })
    }
    Story.create(title, summary, content, author, featuredImage)
    .then(results => {
        res.status(201)
        .json({
            status:"CREATED", 
            message:"Story created successfully"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            message: 'an error occured while saving story'
        })
    });
} 

exports.update = async (req, res) => {
    const storyId = req.params.storyId;
    const {title, summary, content, author} = req.body;
    Story.update(storyId, title, summary, content, author)
        .then(results => {
            res.status(200).json({
            status:"UPDATED", 
            message:"Story updated successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while updating story'
            })
        });
} 

exports.getAll = async (req, res) => {
    Story.getAll()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"All stories retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting all storiews'
            })
        })
} 

exports.getById = async (req, res) => {
    const storyId = req.params.storyId;
    Story.getById(storyId)
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"story retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting story'
            })
        })
} 
  
exports.delete = async (req, res) => {
    const storyId = req.params.storyId;
    Story.delete(storyId)
        .then(results => {
            res.status(200).json({
            status:"DELETED", 
            message:"Story deleted successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while deleting story'
            })
        });
} 
    
