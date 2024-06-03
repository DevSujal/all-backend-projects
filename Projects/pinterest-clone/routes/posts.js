const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/mydb");

const postSchema = mongoose.Schema({
    postText : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    likes : {
        type : Array,
        Default : []
    }
})

module.exports = mongoose.model("Posts", postSchema)