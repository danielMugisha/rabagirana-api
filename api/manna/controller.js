const Manna = require ('./repo')
//import Response from '../../utils/Responses';

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
    Manna.create(title, summary, content, author, featuredImage)
    .then(results => {
        res.status(201)
        .json({
            status:"CREATED", 
            message:"Manna created successfully"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            message: 'an error occured while saving manna'
        })
    });
} 

exports.update = async (req, res) => {
    const mannaId = req.params.mannaId;
    const {title, summary, content, author} = req.body;
    Manna.update(mannaId, title, summary, content, author)
        .then(results => {
            res.status(200).json({
            status:"UPDATED", 
            message:"Manna updated successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while updating a manna article'
            })
        });
} 

exports.getAll = async (req, res) => {
    Manna.getAll()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"All manna articles retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting all manna articles'
            })
        })
} 

exports.getById = async (req, res) => {
    const mannaId = req.params.mannaId;
    Manna.getById(mannaId)
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"manna article retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting manna article'
            })
        })
} 

exports.getLatest = async (req, res) => {
    Manna.getLatest()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"Latest manna article retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting the latest manna article'
            })
        })
} 
    
exports.delete = async (req, res) => {
    const mannaId = req.params.mannaId;
    Manna.delete(mannaId)
        .then(results => {
            res.status(200).json({
            status:"DELETED", 
            message:"Manna deleted successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while deleting a manna article'
            })
        });
} 
    
