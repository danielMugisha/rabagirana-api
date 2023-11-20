const Event = require('./model')

exports.create = async (title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf) =>{
    const newEvent = new Event({
        title, 
        summary, 
        startDate, 
        endDate, 
        registrationForm, 
        featuredImage, 
        featuredPdf
    })
    newEvent.save()
    .then((result)=>{
        return result
    })
    .catch ((error) =>{
        console.log(error)
        return({
            message:"failed to save event"
        })
    })
};

exports.update = async (eventId, title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf) => {
    return await Event.findByIdAndUpdate(
        eventId
        ,{title, summary, startDate, endDate, registrationForm, featuredImage, featuredPdf}).then(
        (err, success) => {
            if(err){
                console.log(err);
                return false;
            }
            return success;
        }
    )
    .catch((err)=>{
        console.log(error)
        return({
            message:"failed to save event"
        })
    })
} 

exports.getAll = async () => {
    try {
        return await Event.find()
    } catch (error) {
        throw error;
    }
}

exports.getById = async (eventId) => {
    try {
        return await Event.findById(eventId)
    } catch (error) {
        throw error;
    }
}

exports.getLastThree = async () => {
    try {
        return await Event.find({ endDate: { $gt: Date.now() } })
        .sort({ startDate: 1 })
        .limit(3)
    } catch (error) {
        throw error;
    }
}

exports.delete = async (eventId) => {
    try {
        return await Event.findByIdAndDelete(eventId);
    } catch (error) {
        throw error;
    }
}