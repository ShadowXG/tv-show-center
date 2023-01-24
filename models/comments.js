// import dependencies
const mongoose = require('./connection')

const User = require('./user')

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
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, 
    { timestamps: true }
)

/////////////////////////////////
// Export our Schema
/////////////////////////////////
module.exports = commentSchema