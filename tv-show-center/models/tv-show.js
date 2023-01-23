// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const tvShowSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
        genre: { type: String, required: true },
		rating: { type: Number, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Show = model('Show', tvShowSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Show
