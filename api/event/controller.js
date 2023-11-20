const Event = require ('./repo')
//import Response from '../../utils/Responses';

exports.create = async (req, res) => {
    let {title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf} = req.body;
    title.trim();
    summary.trim();
    registrationForm.trim();
    featuredImage.trim();
    featuredPdf.trim();

    // testing postman
    startDate = new Date()

    endDate = new Date()
    endDate = new Date(startDate.getTime() + 2*60*1000)

    if(title == "" || summary == "" || startDate == ""){
        res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Empty fields'
        })
    }

    Event.create(title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf)
    .then(results => {
        res.status(201)
        .json({
            status:"CREATED", 
            message:"Event created successfully"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            message: 'an error occured while saving event'
        })
    });
} 

exports.update = async (req, res) => {
    const eventId = req.params.eventId;
    const {title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf} = req.body;
    Event.update(eventId, title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdfr)
        .then(results => {
            res.status(200).json({
            status:"UPDATED", 
            message:"Event updated successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while updating an event'
            })
        });
} 

exports.getAll = async (req, res) => {
    Event.getAll()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"All events retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting all events'
            })
        })
} 

exports.getById = async (req, res) => {
    const eventId = req.params.eventId;
    Event.getById(eventId)
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"event retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting event'
            })
        })
} 

exports.getLastThree = async (req, res) => {
    Event.getLastThree()
        .then(results => {
            res.status(200).json({
                status:"SUCCESS", 
                message:"Latest events retrieved successfully",
                data: results
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while getting the latest events'
            })
        })
} 
    
exports.delete = async (req, res) => {
    const eventId = req.params.eventId;
    Event.delete(eventId)
        .then(results => {
            res.status(200).json({
            status:"DELETED", 
            message:"Event deleted successfully"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                message: 'an error occured while deleting an Event'
            })
        });
} 
    
