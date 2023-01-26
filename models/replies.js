// import dependencies
const { trusted } = require('mongoose')
const mongoose = require('./connection')

const User = require('./user')

const { Schema } = mongoose

// reply schema
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