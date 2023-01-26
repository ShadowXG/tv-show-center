// import dependencies
const mongoose = require('./connection')

const User = require('./user')

const replySchema = require('./replies')

const { Schema } = mongoose

// comment schema
const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: false
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        replies: [replySchema]
    }, 
    { timestamps: true }
)

/////////////////////////////////
// Export our Schema
/////////////////////////////////
module.exports = commentSchema