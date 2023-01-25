// import dependencies
const mongoose = require('./connection')

const User = require('./user')

const { Schema } = mongoose

// comment schema
const replySchema = new Schema(
    {
        reply: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    }, 
    { timestamps: true }
)

/////////////////////////////////
// Export our Schema
/////////////////////////////////
module.exports = replySchema