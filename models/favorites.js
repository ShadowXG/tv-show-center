// import dependencies
const mongoose = require('./connection')
const Show = require('./tv-show')

const User = require('./user')

const { Schema } = mongoose

// comment schema
const favoriteSchema = new Schema(
    {
        favorites: {
            type: Schema.Types.ObjectID,
            ref: 'show'
        },
        owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
    }, 
    { timestamps: true }
)

/////////////////////////////////
// Export our Schema
/////////////////////////////////
module.exports = favoriteSchema