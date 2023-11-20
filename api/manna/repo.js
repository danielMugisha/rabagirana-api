const Manna = require('./model')

exports.create = async (title, summary, content, author, featuredImage) =>{
    const newManna = new Manna({
        title,
        summary,
        content,
        author,
        featuredImage
    })
    newManna.save()
    .then((result)=>{
        return result
    })
    .catch ((error) =>{
        console.log(error)
        return({
            message:"failed to save manna"
        })
    })
};

exports.update = async (mannaId, title, summary, content, author) => {
    try {
        return await Manna.findByIdAndUpdate(
            mannaId
            ,{title, summary, content, author}).then(
            (err, success) => {
                if(err){
                    console.log(err);
                    return false;
                }
                return success;
            }
        );
    } catch (error) {
        throw error;
    }
}

exports.getAll = async () => {
    try {
        return await Manna.find()
    } catch (error) {
        throw error;
    }
}

exports.getById = async (mannaId) => {
    try {
        return await Manna.findById(mannaId)
    } catch (error) {
        throw error;
    }
}

exports.getLatest = async () => {
    try {
        return await Manna.findOne().sort({createdAt: -1})
    } catch (error) {
        throw error;
    }
}

exports.delete = async (mannaId) => {
    try {
        return await Manna.findByIdAndDelete(mannaId);
    } catch (error) {
        throw error;
    }
}