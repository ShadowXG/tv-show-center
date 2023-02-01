// Import Dependencies
const express = require('express')
const axios = require('axios')
require('dotenv').config()
const Show = require('../models/tv-show')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', async (req, res) => {
	Show.find({})
		.then(async shows => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('shows/index', { shows, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's shows
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	console.log(req.session)
	Show.find({ owner: userId })
		.then(shows => {
			res.render('shows/mine', { shows, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's shows
router.get('/favorites', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	console.log(req.session)
	Show.find({ favorites: userId })
		.then(shows => {
			res.render('shows/favorites', { shows, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('shows/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', async (req, res) => {
	req.body.owner = req.session.userId
	console.log('testing')
	await axios(`${process.env.SEARCH_ONE_URL}${req.body.title}`)
		.then(show => {
			console.log(show.data)
			Show.create(req.body)
				.then(show => {
					res.redirect(`/shows/${show.id}`)
				})
				.catch(() => {
					res.redirect(`/error?error=${error}`)
				})	
		})
		.catch((error) => {
			res.redirect(`/error?error=This%20show%20does%20not%20exist!`)
		})	
	})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const showId = req.params.id
	Show.findById(showId)
		.then(show => {
			res.render('shows/edit', { show })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const showId = req.params.id
	Show.findByIdAndUpdate(showId, req.body, { new: true })
		.then(show => {
			res.redirect(`/shows/${show.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', async (req, res) => {
	const showId = req.params.id
	Show.findById(showId)
		.populate('owner', 'username')
		.populate('comments.author', 'username')
		.populate('comments.replies', 'username')
		.populate('comments.replies.author', 'username')
		.then(async show => {
            const {username, loggedIn, userId} = req.session

			// console.log(process.env.WATCHMODE_SEARCH_URL)
			const showInfo = await axios(`${process.env.SEARCH_ONE_URL}${show.title}`)
			// console.log('Show Search summary', showInfo.data)
			show.description = showInfo.data.summary
			// console.log(showSearch.data.genres)
			show.genre = showInfo.data.genres
			// console.log(show.genre)

			// console.log('This is the show\n', show)
			// console.log('These are the replies\n', show.comments[0].replies)
			res.render('shows/show', { show, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const showId = req.params.id
	Show.findById(showId)
		.then(show => {
			if (show.owner == req.session.userId) {
				return show.deleteOne()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20show`)
			}
		})
		.then(() => {
			res.redirect(`/shows/mine`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
