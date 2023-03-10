// import dependencies
const mongoose = require('./connection')

// import comment schema
const commentSchema = require('./comments')

// import favorite schema
// const favoriteSchema = require('./favorites')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const tvShowSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: false },
        genre: [{ type: String, required: false }],
		rating: { type: Number, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema],
		favorites: [{ favShow: String }]
	},
	{ timestamps: true }
)

const Show = model('Show', tvShowSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Show
